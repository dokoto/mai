export function arrayToObject (vals) {
  return (prev, curr) => {
    prev[curr] = vals[curr]
    return prev
  }
}
