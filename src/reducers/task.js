import storiesData from '../data/stories'
import hiraganas from '../data/characterMaps/hiraganas'
import punctuationMarks from '../data/characterMaps/punctuationMarks'
import kanjis from '../data/characterMaps/kanjis'
import {getNumberOfSolvedLines} from '../apis/localStorage'

const initialPreferencesState = () => {
  return {
    doUseKanjis: false,
    doUsePunctuationMarks: false,
  }
}

const initialStoryState = (storyName, preferences) => {
  const storyData = storiesData[storyName]
  const numberOfSolvedLines = getNumberOfSolvedLines(storyName)
  const formattedLines = storyData.lines.map(rawLine =>
    ({
      ...rawLine, formattedJapanese: asLine(rawLine.japanese, preferences)
    })
  )
  const lineBeingSolved = formattedLines[numberOfSolvedLines]
  const b = lineBeingSolved ? nextPositionToRead(lineBeingSolved.formattedJapanese, preferences) : undefined

  return {
    title: formattedLines[0],
    copyright: storyData.copyright,
    solvedLines: formattedLines.slice(0, numberOfSolvedLines),
    solvedPrefix: lineBeingSolved ? lineBeingSolved.formattedJapanese.slice(0, b) : undefined,
    typed: '',
    unsolvedLines: formattedLines.slice(numberOfSolvedLines),
    unsolvedSuffix: lineBeingSolved ? lineBeingSolved.formattedJapanese.slice(b) : undefined,
  }
}

const initialStoriesState = (preferences) => {
  const storiesState = {}
  Object.keys(storiesData).forEach(storyName => {
    storiesState[storyName] = initialStoryState(storyName, preferences)
  })
  return storiesState
}

// fixme for some reason this is called 3 times
const initialState = () => {
  const preferences = initialPreferencesState()
  const stories = initialStoriesState(preferences)
  return {
    stories: stories,
    preferences: preferences,
  }
}

const asRomanCharacter = (japaneseCharacter, preferences) => {
  if (hiraganas[japaneseCharacter]) {
    return hiraganas[japaneseCharacter]
  } else if (preferences.doUsePunctuationMarks && punctuationMarks[japaneseCharacter]) {
    return punctuationMarks[japaneseCharacter]
  } else {
    return undefined
  }
}

const asLine = (japaneseLine, preferences) => {
  if (preferences.doUseKanjis) {
    return japaneseLine
  } else {
    let kanjiFreeLine = japaneseLine
    Object.keys(kanjis).forEach(kanji => {
      kanjiFreeLine = kanjiFreeLine.replace(kanji, kanjis[kanji])
    })
    return kanjiFreeLine
  }
}

const nextPositionToRead = (unsolvedSuffix, preferences) => {
  let result = 0
  for (; result < unsolvedSuffix.length; result++) {
    if (asRomanCharacter(unsolvedSuffix[result], preferences)) {
      break;
    }
  }
  return result
}


export default (state = initialState(), action) => {
  switch (action.type) {

    case "CHANGED":// todo extract this constant, and use proper names, like storyName, typedRomaji
      const storyName = action.payload.story
      const typedRomaji = action.payload.typed

      const preferences = state.preferences
      const story = state.stories[storyName]

      const hiragana = story.unsolvedSuffix[0]
      const romaji = asRomanCharacter(hiragana, preferences)

      // full character match
      if (romaji === typedRomaji) {
        console.log('full')
        let a = nextPositionToRead(story.unsolvedSuffix.slice(1), preferences) + 1 // todo some name

        // full line match
        if (a === story.unsolvedSuffix.length) {
          const newState = {...state} // todo is this deep copy?
          const newSolvedLines = story.solvedLines.slice(0)
          newSolvedLines.push(story.unsolvedLines[0])
          const lineBeingSolved = story.unsolvedLines[1]
          const b = lineBeingSolved ? nextPositionToRead(lineBeingSolved.formattedJapanese, preferences) : undefined
          newState.stories[storyName] = {
            ...story,
            solvedLines: newSolvedLines,
            solvedPrefix: lineBeingSolved ? lineBeingSolved.formattedJapanese.slice(0, b) : undefined,
            unsolvedLines: story.unsolvedLines.slice(1),
            unsolvedSuffix:lineBeingSolved ? lineBeingSolved.formattedJapanese.slice(b) : undefined,
            typed: '',
          }
          return newState
        }
        // full character match
        if (a < story.unsolvedSuffix.length) {
          const newState = {...state}
          newState.stories[storyName] = {
            ...story,
            solvedPrefix: story.solvedPrefix + story.unsolvedSuffix.slice(0, a),
            unsolvedSuffix: story.unsolvedSuffix.slice(a),
            typed: '',
          }
          return newState
        }
      }
      // partial character match
      if (romaji.startsWith(typedRomaji)) {
        const newState = {...state}
        newState.stories[storyName] = {
          ...story,
          typed: typedRomaji,
        }
        return newState
      }
      // incorrect character
      return state

    default:
      return state
  }
}