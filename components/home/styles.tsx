const main = `
  flex
  h-screen
  min-h-full
  p-4
  
  md:flex-row
  md:p-12
  lg:p-24
  xl:p-36
`

const leftHero = `
  w-full
  min-screen
  home-bg

  hidden

  md:bg-cover
  md:flex-1
  md:mx-4
  md:block

  lg:bg-cover

  xl:bg-contain
`

const rightContainer = `
  min-screen
  flex
  flex-col
  justify-center
  max-h-128

  
  sm:max-h-full
  sm:flex-1
  lg:px-4
  xl:px-2
  `
  
  
const rightText = `
  max-w-3xl
`

const title = `
  font-gtSuperBold
  text-3xl
  md:text-4xl
  text-meta

  ml-4

  sm:text-left
  
  
  md:max-w-xl
  md:m-auto
  md:text-5xl

`

const description = `
  font-faktProBlond
  text-meta
  max-w-xl
  text-xl
  
  
  sm:m-auto
  
  pt-6
  
  md:pt-6
  md:max-w-md
  md:text-2xl
  
  lg:max-w-xl
  lg:text-3xl
  lg:pt-10
`

const quizDescription = `
  font-faktProBlond
  text-[18px]
  md:text-[20px]
  text-[#6f7485]

`

const buttonContainer = `
  max-w-xl
  m-auto
  md:max-w-md
  lg:max-w-xl
`

const avatarCircle = `
  w-[60px]
  h-[60px]
  rounded
  md:hidden
  object-cover
`

const mobileHeader = `
  flex
  items-center
  md:block
  max-w-xl
  m-auto
`

export {
  main,
  leftHero,
  rightContainer,
  rightText,
  title,
  description,
  quizDescription,
  buttonContainer,
  avatarCircle,
  mobileHeader
}