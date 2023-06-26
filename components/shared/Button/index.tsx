'use client'

import { button } from './styles'

export default function Button(props: {
  text: string;
  type: string;
  onNavigateQuiz: () => void
}) {
  
  const { text, type, onNavigateQuiz } = props;

  return (
    <button
      onClick={onNavigateQuiz}
      className={button}
    >{text}</button>
  )
}
