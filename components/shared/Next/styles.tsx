const nextButton = (disabled:boolean):string => `
  ${!disabled ? 'cursor-pointer' : ''}
  font-faktProNormal
  text-center
  bg-gray
  rounded
  ease-linear
  ${!disabled ? 'text-question-answer bg-question-answer-fill' : ''}
  ${disabled ? 'text-disabled' : 'text-meta'}
  w-full
  text-lg
  py-3
  px-6
  md:text-md
  md:py-2
  md:px-6
  md:w-auto
`

const container = `
  my-4 pb-4 flex flex-row justify-end

`

export {
  nextButton,
  container
}

  