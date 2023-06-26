'use client'

import {
  choiceDecorator, choiceLoading,
  choiceContainer, choicesLoading
} from './styles';
  
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
      className={choiceDecorator(selected)}
    >{text}</div>
  )
}
const ChoiceLoading = () => {
  return (
    <div
      className={choiceLoading}
    />
  )
}

export default function Choices(props: {
  selected: number;
  reset: boolean,
  choices: Choice[]
  updateSelected: (id:number) => void
}) {
  const { choices, selected, updateSelected } = props;

  const onUpdateSelected = (id:number):void => {
    updateSelected(id);
  }

  return (
    <div>
      <div className={choiceContainer}>
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
      <div className={choicesLoading}>
        <ChoiceLoading/>
        <ChoiceLoading/>
        <ChoiceLoading/>
        <ChoiceLoading/>
      </div>
    </div>
  )
}
