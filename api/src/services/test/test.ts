let num = 0

export const test = () => ({
  id: 1,
  first: 'first',
  second: num++,
})

export const updateTest = () => {
  return {
    id: 1,
    first: 'first',
    second: 1,
  }
}
