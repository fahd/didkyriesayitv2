import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { Choices, ChoicesLoading, Timer, Next } from '../shared';

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
    <div className={``}>

      <Choices reset={reset} choices={choices} selected={selected} updateSelected={onUpdateSelected}/>
      <Next onNext={onUpdateView} selected={selected > -1} text={'Next'}/>
    </div>
  )
}

const green = '#00DF59';
const gray = '#d6def5';
const TIME_TO_COUNTDOWN = .75 * 1000;
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
    setTimeout(countDownUntilZero, 1);
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
  onNext: () => void;
  idx: number;
}) => {
  const { results, selected, idx, onNext } = props;
  const { times_answered } = results;
  let { choices } = results;
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
      <p className={`text-meta font-faktProNormal text-md mb-5`}>(<span className={'font-faktProBlack'}>{times_answered} times</span> this question has been seen 👀)</p>
      {resultsMap}
      <Next onNext={onNext} selected={true} text={text} />
    </div>
  )
}

const QuizBody = (props: {
  reset: boolean;
  text: string;
  view: string;
  selected: number;
  correctAuthor: string;
  avatar_url: string;
  onUpdateSelected: () => void;
  onUpdateQuestion: () => void;
  onUpdateView: () => void;
  choices: Choice[];
  results: Results;
  idx: number;
}) => {
  const { idx, reset, view, text, selected, choices, avatar_url, correctAuthor, results, onUpdateSelected, onUpdateView, onUpdateQuestion } = props;

  if (view === 'l') {
    return <QuizLoading/>
  }

  return (
    <div>
      <div className='flex flex-row my-12'>
        
        <div className='min-w-[120px]'>
          {view === 'q' && <Image className={``} src={'/../public/huh.png'} alt="who this be" width={120} height={120} />}
          {view === 'r' && <Image className={``} src={avatar_url} alt={correctAuthor} width={120} height={120} />}
          {view === 'r' && <div className='my-2 text-center text-meta font-faktProBlack'>{correctAuthor}</div>}
        </div>
        
          <p className='
            mx-8
            font-faktProBlack
            text-[22px]
            grow
            text-meta
            '>
           “{text}”
          </p>
          
        <div><Timer reset={reset} updateView={onUpdateView}></Timer></div>
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
        onNext={onUpdateQuestion}
        idx={idx}
      />}
      
      </div>
  )
}


export default QuizBody;