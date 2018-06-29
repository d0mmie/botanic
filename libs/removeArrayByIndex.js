export default (array, index) => {
  return array.map((val, key) => key === index ? undefined : val).reduce((total, current) => {
    if (current === undefined) {
      return total
    }
    return [ ...total, current ]
  }, [])
}
