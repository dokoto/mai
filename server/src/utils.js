export function arrayToObject (vals) {
  return (acc, curr) => {
    acc[curr] = vals[curr]
    return acc
  }
}

export function genOrQuery (orKey) {
  return (acc, curr) => {
    acc.$or.push({ [orKey]: curr })
    return acc
  }
}
