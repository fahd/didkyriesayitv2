'use client'

export default function Button(props: {
  text: string;
  type: string;
  onNavigateQuiz: () => void
}) {
  
  const { text, type, onNavigateQuiz } = props;

  return (
    <button
      onClick={onNavigateQuiz}
      className='
        cursor-pointer
        mt-16
        font-faktProNormal
        p-4
        text-center
        bg-gray
        text-2xl
        w-full
        rounded
        text-meta
      '
    >{text}</button>
  )
}
