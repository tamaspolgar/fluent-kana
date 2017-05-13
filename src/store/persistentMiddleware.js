import {setNumberOfSolvedLines} from '../apis/localStorage'

export default (store) => (next) => (action) => {
  const numberOfSolvedLinesByStoryBefore = {}
  Object.keys(store.getState().task.stories).forEach(story => {
    numberOfSolvedLinesByStoryBefore[story] = store.getState().task.stories[story].solvedLines.length
  })
  const result = next(action)

  Object.keys(store.getState().task.stories).forEach(story => {
    const numberOfSolvedLinesAfter = store.getState().task.stories[story].solvedLines.length
    if (numberOfSolvedLinesAfter !== numberOfSolvedLinesByStoryBefore[story]) {
      setNumberOfSolvedLines(story, numberOfSolvedLinesAfter)
    }
  })
  return result
}