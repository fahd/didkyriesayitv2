import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { Choices, ChoicesLoading, Timer, Next } from '../shared';
import { scoreGame } from '../../lib/utils'

type Choice = {
  authorid: number;
  author_name: string;
  correct: boolean;
}

type ResultChoice = {
  authorid: string;
  author_name: string;
  correct: boolean;
  times_selected: number;
}

type Results = {
  times_answered: number;
  no_response: number;
  choices: ResultChoice[]
  average_response_time: number;
}

export const QuizLoading = () => {
  return (
    <div className='load'>
      <div className='flex flex-row my-12'>
        <div className='min-w-[120px]'>
          <div className={`w-[120px] h-[120px] bg-gray`}/>
        </div>
      </div>  
      <ChoicesLoading/>
    </div>
  )
}

const Question = (props: {
  reset: boolean;
  choices: Choice[];
  selected: number;
  onUpdateSelected: () => void;
  onUpdateView: () => void;
}) => {
  const { reset, choices, selected, onUpdateSelected, onUpdateView } = props;
  return (
    <div className={`mb-4`}>

      <Choices reset={reset} choices={choices} selected={selected} updateSelected={onUpdateSelected}/>
      <Next onNext={onUpdateView} selected={selected > -1} text={'Next'}/>
    </div>
  )
}

const green = '#00DF59';
const gray = '#d6def5';
const TIME_TO_COUNTDOWN = .5 * 1000;
const c = 'CORRECT';
const w = 'WRONG';

const ResultBar = (props: {
  choice: ResultChoice;
  times_answered: number;
  selected: number | null;
}) => {
  const { choice, times_answered, selected } = props;
  const { author_name, authorid, correct, times_selected } = choice;

  const [time, updateTime] = useState(TIME_TO_COUNTDOWN);
  const [percentFill, updatePercentage] = useState(0);
  const [referenceTime, updateReferenceTime] = useState(Date.now());
  
  const percentage = Math.round(times_selected / times_answered * 100);
  const barColor = correct ? green : gray;

  useEffect(() => {
    const countDownUntilZero = () => {
      updateTime(prevTime => {
        const now = Date.now();
        let interval = now - referenceTime;
        
        if (prevTime <= 0) {
          return 0;
        }
        updateReferenceTime(now);
        const currTime = (prevTime - interval);
        const percentToFill = ((TIME_TO_COUNTDOWN - currTime) / TIME_TO_COUNTDOWN) * percentage;
        updatePercentage(percentToFill);
        updateTime(prevTime - interval);
        return prevTime - interval;
      });
    }
    setTimeout(countDownUntilZero, 2);
  })

  const sc = selected == parseInt(choice.authorid) ? (correct ? c : w) : '';
  
  return (
    <div className='w-full mt-1 relative'>
      <div className='text-meta font-faktProNormal flex items-center'>
        <p className={`${authorid === '-1' && 'text-[#adb5cf]'} ${sc ? (sc === c ? 'font-faktProBlack text-right' : 'font-faktProBlack text-wrong') : ''}`}>{author_name}</p>
      </div>
      <div className={`absolute text-sm font-faktProBlack text-meta`} style={{left: `${percentFill + 0.5}%`}}>{Math.round(percentFill)}%</div>
      <svg width="100%" height="30px"> 
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#EEF2FF" strokeWidth='40px'/>a
        <line className='relative' x1="0" y1="0" x2={`${percentFill}%`} y2="0" stroke={barColor} strokeWidth='40px'>
        </line>
      </svg>
    </div>
  )
}

const Result = (props: {
  results: Results
  selected: number;
  source: string;
  source_url: string;
  onNext: () => void;
  idx: number;
}) => {
  const { results, selected, source, source_url, idx, onNext } = props;
  const { times_answered } = results;
  let { choices, average_response_time } = results;
  const resultsMap = choices.map(choice => <ResultBar key={choice.authorid} selected={selected} choice={choice} times_answered={times_answered} />);

  if (results.no_response > 0) {
    resultsMap.push(<ResultBar
      key={-1}
      selected={null}
      choice={{
        authorid: '-1',
        author_name: "(Ran out of time 😅)",
        correct: false,
        times_selected: results.no_response
      }}
      times_answered={times_answered} />)
  }
  const finished = idx + 1 === 10;
  const text = finished ? "Finish" : "Next";
  return (
    <div>
    <div className='bg-[#f3f3f5] p-4 rounded'>
        <p>
          <span className={'text-meta font-faktProBlack'}>📖 Source:&nbsp;</span>
          <a className='underline text-meta'  target="_blank" href={source_url}>{source}</a>
        </p>
        <p className={`text-meta font-faktProNormal text-md`}>
          <span className={'font-faktProBlack'}>✏️ Responses: &nbsp;</span>
           {times_answered}
        </p>
        <p className={`text-meta font-faktProNormal text-md`}>
          <span className={'font-faktProBlack'}>⏱️ Average Response Time: &nbsp;</span>
           {average_response_time.toFixed(2)} seconds
        </p>
    </div>
      {resultsMap}
      <Next onNext={onNext} selected={true} text={text} />
      
    </div>
  )
}

const Finish = (props: {
  score: number;
}) => {
  const { score } = props;
  const { rank, message, adjective } = scoreGame(score);
  
  return (
    <div>
      <div className='rounded flex flex-col bg-gray text-meta items-center relative h-3/4 py-8 px-10 justify-center text-2xl font-faktProBlond'>
        <div className='flex flex-col items-center'>
          <p className='text-meta text-md my-4'>💥 Bang! You went {adjective} <span className='font-faktProBlack'>{score}/10</span> from the field! </p>
          
          <div className='flex flex-col items-center my-8 pb-8'>
            <div className='font-faktProBlond'>You have achieved the title of</div>
            <p className='text-5xl font-gtSuperBold py-2 mt-4'>{rank}</p>
            <div className='flex flex-col text-center max-w-xl m-auto font-faktProNormal items-center'>
              {message}
            </div>
          </div>

          
          <div className='mt-4'>
            <span className='cursor-pointer text-meta underline font-faktProNormal' onClick={() => window.location.reload()}>Play again?</span> <br />
          </div>

        </div>
      </div>
      <div className='font-faktProNormal bg-[#f3f3f5] text-[#333] relative h-1/4 p-4 text-lg mt-4'>
        Thanks for playing!
      </div>
    </div>
  )
}

const QuizBody = (props: {
  reset: boolean;
  text: string;
  view: string;
  selected: number;
  source: string;
  source_url: string;
  score: number;
  correctAuthor: string;
  avatar_url: string;
  onUpdateSelected: () => void;
  onUpdateQuestion: () => void;
  onUpdateView: () => void;
  choices: Choice[];
  results: Results;
  idx: number;
}) => {
  const { idx, reset, view, text, selected, source, source_url, score, choices, avatar_url, correctAuthor, results, onUpdateSelected, onUpdateView, onUpdateQuestion } = props;

  if (view === 'l') {
    return <QuizLoading/>
  }

  if (view === 'f') {
    return(
    <Finish score={score}/>
    )
  }

  const imgSrc = view === 'q' ? '/../public/huh.png' : avatar_url;
  const alt = view === 'q' ? 'Who could this be?' : correctAuthor;


  return (
    <div>
      <div className='flex flex-row my-12 mb-8'>     
        <div className=''>
          <div className='relative w-[160px] h-[160px]'>
            <div className={`bg-gray absolute top-0 right-0 bottom-0 left-0 z-10`}>
            </div>
            <Image
              className={`relative z-20 object-cover`}
              src={imgSrc}
              alt={alt}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%' }}
              
              />
          </div>
          {view === 'r' && <div className='my-2 text-center text-meta font-faktProBlack'>{correctAuthor}</div>}
        </div>

        <div className='grow'>
          <p className='
            mx-8
            font-faktProBlack
            text-[22px]
            text-meta
            '>
           “{text}”
          </p>
        </div>
          
        <div>
          <Timer reset={reset} updateView={onUpdateView} />
        </div>

      </div>

      {view === 'q' && <Question
        reset={reset}
        choices={choices}
        selected={selected}
        onUpdateSelected={onUpdateSelected}
        onUpdateView={onUpdateView}
      />}
      
      {view === 'r' && <Result
        selected={selected}
        results={results}
        source={source}
        source_url={source_url}
        onNext={onUpdateQuestion}
        idx={idx}
      />}
      
      </div>
  )
}


export default QuizBody;