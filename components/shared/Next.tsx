'use client'

export default function Next (props: {
  selected: boolean
  updateView: () => void
}) {
  const { selected, updateView } = props;
  const disabled = !selected;
  return (
    <div className='w-[99%] mt-4 flex flex-row justify-end'>
      <button
        onClick={() => updateView()}
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
      >Next</button>
    </div>
  )
}