// Quiz Layout
const quizContainer = `
  max-w-4xl
  m-auto
  h-screen
  min-h-full
  p-4
  pt-4
  md:pt-16
`

const quizBodyContainer = `
  flex
  flex-row
  mt-6
  mb-2
  justify-center
  md:mt-12
  md:mb-4
`

const quizHeader = `
  flex
  flex-row
  justify-between
  align-center
`

const quizHeaderQuestion = `
  font-faktProNormal text-lg text-meta
`

const quizHeaderTitle = `
  font-gtSuperBold text-meta text-xl
`

const quizSeparator = `
  my-4
  mb-2
  md:mb-4
  border-separator
`

const quizAvatar = `
  hidden
  rounded
  relative
  z-20
  object-cover

  md:block
`

const quizAvatarMobile = `
  block
  rounded
  relative
  z-20
  object-cover

  md:hidden
`


const quizCorrectAuthor = `
  my-2
  text-left
  text-[18px]
  text-meta
  font-faktProBlack

  w-[120px]

`

const quizCorrectAuthorMobile = `
  text-2xl
  my-2
  text-center
  text-meta
  font-gtSuperBold

  md:hidden

`

const questionText = `
  hidden
  md:block
  mx-8
  font-faktProBlack
  text-[22px]
  text-meta
`

const questionTextFull = `
  grow
  hidden
  md:block
`

const questionTextMobileContainer = `
  flex
  my-2
  justify-center

`

const questionTextMobile = (view:string):string => `
  font-faktProBlack
  text-[20px]
  text-meta
  text-left
  rounded
  my-2
  mb-2
  w-full
  ${view === 'r' && 'bg-gray'}
  ${view === 'r' ? 'p-8' : 'p-4'}
  md:hidden
`

// Author
const avatarContainer = `
  hidden
  md:block
`
const avatarImageContainer = `
  relative

  w-[120px]
  h-[120px]
`

const avatarImageMobileContainer = (view:string) => `
  ${view ==='q' ? 'hidden' : 'block'}
  relative
  
  min-w-[300px]
  min-h-[250px]

  md:hidden
`

const avatarFill = `
  bg-gray
  absolute
  top-0
  right-0
  bottom-0
  left-0
  z-10
`

// Quiz Loading
const quizLoadingContainer = `
  justify-center
  md:justify-start
  flex
  flex-row
  my-12
`

const quizLoading = `
  min-w-[120px]
`
const quizBackground = `
  min-w-[300px]
  min-h-[250px]
  md:min-w-[120px]
  md:min-h-[120px]
  bg-gray
`

// Question
const questionContainer = `
  mb-4
`

// Result
const resultContainer = `
  w-full mt-1 relative
`
const resultAuthorInfo = `
  text-meta font-faktProNormal flex items-center
`
const resultAuthorName = (authorid:string, sc:string, c:string) => (
  `${authorid === '-1' && 'text-[#adb5cf]'} ${sc ? (sc === c ? 'font-faktProBlack text-right' : 'font-faktProBlack text-wrong') : ''}`
)
const resultPercent = `absolute text-sm font-faktProBlack text-meta`;

const resultDataContainer = `
  bg-[#f3f3f5]
  p-4
  rounded
  text-md
  md:text-lg
`

const resultDataSource = `
  text-meta font-faktProBlack
`

const resultDataSourceUrl = `underline text-meta`

const resultDataResponses = `text-meta font-faktProNormal`

const resultDataResponsesText = 'font-faktProBlack'

const resultDataTime = `text-meta font-faktProNormal`

const resultDataTimeText = `font-faktProBlack`

// Finish
const finishContainer = `
  rounded
  flex
  flex-col
  bg-gray
  text-meta
  items-center
  relative
  h-3/4
  justify-center
  text-2xl
  font-faktProBlond

  py-2
  px-4

  md:py-6
  md:px-8
  md:pt-8
  md:pb-10
  md:px-10
  
`

const finishTopHalf = `
  flex flex-col items-center
`

const finishScoreText = `
  text-meta
  text-[18px]
  md:text-md
  my-4
  font-faktProBlond
`

const finishScoreNumber = `
  font-faktProBlack
`

const finishRank = `
  flex flex-col items-center
  rounded
  border-[#dfe6fd]
  border-4
  p-4
  my-4
  md:my-8
  md:p-12
`

const finishRankTitle = `
  font-faktProBlond
  text-center
  text-[18px]
  md:text-md
`

const finishTitle = `
  font-gtSuperBold
  pt-2
  pb-4
  text-center
  text-3xl
  md:text-5xl
`;


const finishMessage = `
  max-w-f
  flex
  flex-col
  text-[18px]
  m-auto
  font-faktProNormal
  items-center
  text-center
  leading-6
  
  md:text-lg
  md:text-left
  md:max-w-xl
`

const finishShare = ` 
  bg-[#1D9BF0]
  hover:bg-[#198ad5]
  text-white
  py-1
  px-4
  mr-2
  justify-center
  flex
  rounded
`;


const playAgainContainer = `
  mt-2
  flex
  flex-row
  items-center
  text-[18px]
  font-faktProNormal
  
  `;
  
  const playAgainText = `
  cursor-pointer 
  text-meta 
  font-faktProNormal
  rounded
  py-1
  px-4
  text-question-answer
  bg-question-answer-fill
`

const finishThank = `
  font-faktProNormal 
  bg-[#f3f3f5] 
  text-[#444] 
  relative 
  h-1/4 
  p-4
  text-md 
  md:text-lg 
  mt-4
  flex
  flex-col
`

const socialIcon = `
  mr-1
  inline
`

const socialIconContainer = `
  inline-block
  items-center
  text-[#fff]
  text-[16px]
  flex
  grow
  rounded
  py-1
  px-2
  mr-2
`

const social = `
  flex
  py-4
  items-center
  justify-center
  md:justify-start

`


export {
  quizContainer,
  quizHeader,
  quizHeaderTitle,
  quizHeaderQuestion,
  quizBodyContainer,
  avatarContainer,
  avatarImageContainer,
  avatarImageMobileContainer,
  quizSeparator,
  quizAvatar,
  quizAvatarMobile,
  questionText,
  questionTextFull,
  questionTextMobileContainer,
  questionTextMobile,
  quizCorrectAuthor,
  quizCorrectAuthorMobile,
  avatarFill,
  quizLoadingContainer,
  quizLoading,
  quizBackground,
  questionContainer,
  resultContainer,
  resultAuthorInfo,
  resultAuthorName,
  resultPercent,
  resultDataContainer,
  resultDataSource,
  resultDataSourceUrl,
  resultDataResponses,
  resultDataResponsesText,
  resultDataTime,
  resultDataTimeText,
  finishContainer,
  finishTopHalf,
  finishShare,
  finishScoreText,
  finishScoreNumber,
  finishRank,
  finishRankTitle,
  finishTitle,
  finishMessage,
  playAgainContainer,
  playAgainText,
  finishThank,
  social,
  socialIcon,
  socialIconContainer
}