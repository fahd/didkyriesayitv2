'use client'

const Choice = (props: {
  text: string;
  id: number;
  selected: boolean;
  onUpdateSelected: (id: number) => void
}) => {

  const { text, id, selected, onUpdateSelected } = props;
  return (
    <div
      onClick={() => onUpdateSelected(id)}
      className={`
        cursor-pointer
        font-faktProNormal
        p-2
        text-center
        bg-gray
        text-xl
        w-full
        rounded
        text-question
        border-2
        border-question-b
        ${!selected ? 'bg-question-fill' : 'bg-question-fill-selected'}
        ${!selected ? 'hover:bg-question-fill-hover' : 'hover:bg-question-fill-selected'}
        basis-1/2
        m-1
        max-w-[49%]
      `}
    >{text}</div>
  )
}

export default function Choices(props: {
  selected: number;
  reset: boolean,
  choices: ({
    id: number;
    text: string;
  }[])
  updateSelected: (id:number) => void
  updateView: () => void
}) {
  const { choices, selected, reset, updateSelected, updateView } = props;

  const onUpdateSelected = (id:number):void => {
    updateSelected(id);
  }

  return (
    <div>
      <div className={
        `
        flex flex-row flex-wrap justify-center
        `
      }>
        {/* Question Choices */}
        {choices.map((choice, idx) => (
          <Choice
            key={idx}
            id={choice.id}
            selected={choice.id === selected}
            text={choice.text}
            onUpdateSelected={onUpdateSelected}
          />
        ))}
        
      </div>
    </div>
  )
}
