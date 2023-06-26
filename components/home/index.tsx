'use client'

import Image from 'next/image';
import { Button } from '../shared';
import { useRouter } from 'next/navigation';
import {
  main,
  leftHero,
  rightContainer,
  rightText,
  title,
  description,
  quizDescription,
  buttonContainer,  
  avatarCircle,
  mobileHeader

} from './styles';


const src = 'https://didkyriesayit.s3.us-east-2.amazonaws.com/avatars/1.png';

export default function Home () {  
  const router = useRouter();

  const onNavigateQuiz = () => {
    router.push('/quiz');
  }

  return (
    <div>
      <main className={main}>
        <div className={leftHero}/>
        <div className={rightContainer}>
          <div className={rightText}>
            <div className={mobileHeader}>
                <Image
                  className={avatarCircle}
                  src={src}
                  alt={'Kyrie Irving'}
                  width={50}
                  height={50}
                  // sizes="100vw"
                  // style={{ width: '100%', height: '100%' }}
                  />
                <h1 className={title}>Did Kyrie Say It?</h1>
              </div>
            <div className={description}>
              <p>A short ten question quiz to gauge how enlightened you <em>really</em> are 👀.</p>
              <br />
              <p className={quizDescription}>
                (Quiz is randomly generated from 100 questions - you can take it more than once!)
              </p>
            </div>
            <div className={buttonContainer}>
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
