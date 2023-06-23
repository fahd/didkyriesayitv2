'use client'

type Choice = {
  authorid: number;
  author_name: string;
  correct: boolean;
}

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
        border-2
        border-question-b
        ${selected ? 'text-question-answer hover:bg-question-answer-fill bg-question-answer-fill border-question-answer' : 'text-question bg-question-fill hover:bg-question-fill-hover'}
        basis-1/2
        m-1
        my-1
        py-4
        max-w-[49%]
      `}
    >{text}</div>
  )
}
const ChoiceLoading = () => {
  return (
    <div
      className={`
        p-2
        text-center
        bg-gray
        w-full
        rounded
        text-question
        basis-1/2
        m-1
        my-4em
        max-w-[49%]
        min-h-[75px]
      `}
    />
  )
}

export default function Choices(props: {
  selected: number;
  reset: boolean,
  choices: Choice[]
  updateSelected: (id:number) => void
}) {
  const { choices, selected, reset, updateSelected } = props;

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
            key={choice.authorid}
            id={choice.authorid}
            selected={choice.authorid === selected}
            text={choice.author_name}
            onUpdateSelected={onUpdateSelected}
          />
        ))}
        
      </div>
    </div>
  )
}
export const ChoicesLoading = () => {
  return (
    <div>
      <div className={`flex flex-row flex-wrap justify-center`}>
        <ChoiceLoading/>
        <ChoiceLoading/>
        <ChoiceLoading/>
        <ChoiceLoading/>
      </div>
    </div>
  )
}
