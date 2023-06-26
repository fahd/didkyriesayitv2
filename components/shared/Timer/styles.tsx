const container = (view: string) => `
  ${view === 'r' && 'hidden'}
  md:block 
  relative
  scale-150
  md:scale-100
  my-4
  md:my-0
`

const timerText = `
  absolute
  h-full
  w-full
  flex
  justify-center
  items-center
  text-meta
  font-faktProBlack
  text-xl
`

export {
  container,
  timerText
}