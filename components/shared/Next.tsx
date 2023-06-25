'use client'

export default function Next (props: {
  selected: boolean
  onNext: () => void
  text: string
}) {
  const { selected, onNext,text } = props;
  const disabled = !selected;
  return (
    <div className='my-4 pb-2 flex flex-row justify-end'>
      <button
        onClick={() => onNext()}
        disabled={!selected}
        className={`
          ${!disabled ? 'cursor-pointer' : ''}
          font-faktProNormal
          py-2
          px-6
          text-center
          bg-gray
          text-md
          rounded
          ease-linear
          ${!disabled ? 'text-question-answer bg-question-answer-fill' : ''}
          ${disabled ? 'text-disabled' : 'text-meta'}
          `}
      >{text}</button>
    </div>
  )
}