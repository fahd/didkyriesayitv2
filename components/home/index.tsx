'use client'

import Image from 'next/image';
import { Button } from '../shared';
import { useRouter } from 'next/navigation';

export default function Home () {  
  const router = useRouter();

  const onNavigateQuiz = () => {
    router.push('/quiz');
  }

  return (
    <div>
    {/* <header>Home</header> */}
      <main className="
        flex
        flex-col-reverse
        md:flex-row
        h-screen
        min-h-full
        p-4
        sm:p-2
        md:p-24
        lg:p-36
        ">
        {/* Left Image */}
        <div className="
          min-screen
          md:flex-1
          w-32 
          home-bg
          md:mx-4
          w-full"/>
        {/* Right Text */}
        <div className="
            sm:flex-1
            min-screen
            px-2
            flex
            flex-col
            justify-center
            md:max-h-64
            md:max-h-96
            lg:max-h-128
            ">
          <div className='
            max-w-3xl
            '>
            <h1 className='
              text-2xl
              md:text-4xl
              lg:text-6xl
              font-gtSuperBold
              text-center
              md:text-left
              text-meta
              '>Did Kyrie Say It?
            </h1>
            <p className='
              font-faktProBlond
              pt-10
              pr-10
              text-3xl
              text-meta
              max-w-xl
            '>
              A short ten question quiz to gauge how enlightened you <em>really</em> are.
            </p>
            <div className='max-w-md'>
              <Button
                onNavigateQuiz={onNavigateQuiz}
                type={'start'}
                text={"Get Started 👉"} />
            </div>
        </div>
      </div>
    </main>
   </div>
  )
}
