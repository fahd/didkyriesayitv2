'use client'

import { useRouter } from 'next/navigation';

export default function Button(props: {
  text: string;
  type: string;
}) {
  const router = useRouter();
  const { text, type } = props;
  let cb;

  const onGenerateQuiz = () => {
    console.log('here I am');
    router.push('/quiz/1');
  }

  cb = type === 'start' ? onGenerateQuiz : () => { };

  return (
    <button
      onClick={onGenerateQuiz}
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
