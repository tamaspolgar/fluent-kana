const getInt = (key) => {
  const value = localStorage.getItem(key)
  if (value) {
    return +value
  } else {
    return 0
  }
}

export const getNumberOfSolvedLines = (story) => {
  return getInt(story + '.numberOfSolvedLines')
}

export const setNumberOfSolvedLines = (story, numberOfSolvedLines) => {
  return localStorage.setItem(story + '.numberOfSolvedLines', numberOfSolvedLines)
}