export function arrayToObject (vals) {
  return (prev, curr) => {
    prev[curr] = vals[curr]
    return prev
  }
}

export function genOrQuery (orKey) {
  return (prev, curr) => {
    prev.$or.push({ [orKey]: curr })
    return prev
  }
}
