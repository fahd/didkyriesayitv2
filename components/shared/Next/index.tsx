'use client'

import { nextButton, container } from './styles'

export default function Next (props: {
  selected: boolean
  onNext: () => void
  text: string
}) {
  const { selected, onNext,text } = props;
  const disabled = !selected;
  return (
    <div className={container}>
      <button
        onClick={() => onNext()}
        disabled={!selected}
        className={nextButton(disabled)}
      >{text}</button>
    </div>
  )
}