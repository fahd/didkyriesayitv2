const choiceDecorator = function (selected:boolean):string {
  return `
    cursor-pointer
    font-faktProNormal
    p-2
    text-center
    bg-gray
    text-xl
    rounded
    border-2
    w-full
    
    ${selected ? 'text-question-answer hover:bg-question-answer-fill bg-question-answer-fill border-question-answer-b' : 'border-question-b text-question bg-question-fill hover:bg-question-fill-hover'}
    
    basis-1/2
    m-1
    my-1
    py-4
    max-w-f
    md:max-w-[49%]
  `
}

const choiceLoading = `
  p-2
  text-center
  bg-gray
  w-full
  rounded
  text-question
  m-1
  my-4em
  min-h-[75px]
  max-w-full
  basis-1/1
  md:basis-1/2
  md:max-w-[49%]
`

const choicesLoading = `
  flex flex-row flex-wrap justify-center
`

const choiceContainer = `
  md:flex
  md:flex-row
  md:flex-wrap
  md:justify-center
`

export {
  choiceDecorator,
  choiceLoading,
  choicesLoading,
  choiceContainer
}