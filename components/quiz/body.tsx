import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { Choices, ChoicesLoading, Timer, Next } from '../shared';
import { scoreGame, generateTwitterLink } from '../../lib/utils'
import gitHubSrc from './../../public/assets/social/github-white.svg'
import twitterSrc from './../../public/assets/social/twitter-white.svg'

// Refactor later -> Split components into their own folders. Ugly up here, cleaner classnames below like styled components. Done for my own readability
import {
  quizBodyContainer,avatarContainer, avatarFill,
  quizLoadingContainer, quizLoading, quizBackground,
  questionContainer, quizAvatar, quizAvatarMobile,
  quizCorrectAuthor, questionText, questionTextMobileContainer,
  questionTextMobile, resultContainer, resultAuthorInfo,
  resultAuthorName, resultPercent, resultDataContainer,
  resultDataSource, resultDataSourceUrl, resultDataResponses,
  resultDataResponsesText, resultDataTime, resultDataTimeText,
  finishContainer, finishTopHalf, finishScoreText,finishShare,
  finishScoreNumber,finishRank, finishRankTitle, finishTitle,
  finishMessage, playAgainContainer, playAgainText,
  finishThank, questionTextFull, avatarImageContainer,
  avatarImageMobileContainer, quizCorrectAuthorMobile,
  social, socialIcon,socialIconContainer

} from './styles'

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
      <div className={quizLoadingContainer}>
        <div className={quizLoading}>
          <div className={quizBackground}/>
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
  onUpdateSelected: (n:number) => void;
  onUpdateView: () => void;
}) => {
  const { reset, choices, selected, onUpdateSelected, onUpdateView } = props;
  return (
    <div className={questionContainer}>
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
    <div className={resultContainer}>
      <div className={resultAuthorInfo}>
        <p className={resultAuthorName(authorid, sc, c)}>{author_name}</p>
      </div>
      <div className={resultPercent} style={{left: `${percentFill + 0.5}%`}}>{Math.round(percentFill)}%</div>
      
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
      selected={selected}
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
    <div className={resultDataContainer}>
        <p>
          <span className={resultDataSource}>📖 Source:&nbsp;</span>
          <a className={resultDataSourceUrl}  target="_blank" href={source_url}>{source}</a>
        </p>
        <p className={resultDataResponses}>
          <span className={resultDataResponsesText}>✏️ Responses: &nbsp;</span>
           {times_answered}
        </p>
        <p className={resultDataTime}>
          <span className={resultDataTimeText}>⏱️ Average Response Time: &nbsp;</span>
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
      <div className={finishContainer}>
        <div className={finishTopHalf}>
          <p className={finishScoreText}>💥 Bang! You went {adjective} <span className={finishScoreNumber}>{score}/10</span> from the field! </p>
          
          <div className={finishRank}>
            <div className={finishRankTitle}>You have achieved the title of</div>
            <p className={finishTitle}>{rank}</p>
            <div className={finishMessage}>
              {message}
            </div>
          </div>

          
          <div className={playAgainContainer}>
            <a className={finishShare} href={generateTwitterLink(score)} target='_blank'>
              <Image
                className={`${socialIcon}”`}
                src={twitterSrc}
                alt={'Twitter Logo'}
                width={20}
                height={20}
              />
              <span>Share</span>
            </a>
            <div className={playAgainText} onClick={() => window.location.reload()}>Play again?</div>
          </div>

        </div>
      </div>
      <div className={finishThank}>
        Thank you for playing! I made this mainly as a side project. <br/><br/>If this was interesting at all feel free to reach out.
        <div className={social}>
          <div>
            <a href='https://github.com/fahd/didkyriesayitv2' target='_blank' className='inline-block'>
              <div className={`${socialIconContainer} bg-[#333333]`}>
                <Image
                    className={socialIcon}
                    src={gitHubSrc}
                    alt={'View Code'}
                    width={20}
                    height={20}
                    />
                    <span>Code</span>
              </div>
            </a>
          </div>
          <div>
            <a className={`${finishShare} mr-1`} href={`https://twitter.com/asadhabibs`} target='_blank'>
                <Image
                  className={`${socialIcon}`}
                src={twitterSrc}
                alt={'Twitter Logo'}
                width={20}
                height={20}
              />
              <span>Twitter</span>
            </a>
          </div>
          <div>
            <a href='mailto:littlehabib@proton.me' target='_blank' className='inline-block'>
              <div className={`${socialIconContainer} bg-[#666]`}>
                  <span>✉️ Email &nbsp;</span>
              </div>
            </a>
            </div>
        </div>
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
  onUpdateSelected: (n:number) => void;
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

  const imgSrc = view === 'q' ? 'https://didkyriesayit.s3.us-east-2.amazonaws.com/avatars/unknown.png' : avatar_url;
  const alt = view === 'q' ? 'Who could this be?' : correctAuthor;


  return (
    <div>
      <div className={quizBodyContainer}>     
        <div className={avatarContainer}>
          <div className={avatarImageContainer}>
            <div className={avatarFill}/>
            <Image
              className={quizAvatar}
              src={imgSrc}
              alt={alt}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%' }}
              />
          </div>
          {view === 'r' && <div className={quizCorrectAuthor}>{correctAuthor}</div>}
        </div>

        <div className={questionTextFull}>
          <div>
            <p className={questionText}>
            “{text}”
              </p>
          </div>
        </div>

        <div className={'h-full'}>
          <div className={avatarImageMobileContainer(view)}>
            {view === 'r' && (
              <div>
                <div className={avatarFill}/>
                <Image
                className={quizAvatarMobile}
                src={imgSrc}
                alt={alt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
          </div>
          {view === 'r' && <div className={quizCorrectAuthorMobile}>{correctAuthor}</div>}
        </div>
          
        <div>
          <Timer view={view} reset={reset} updateView={onUpdateView} />
        </div>

      </div>
      <div className={questionTextMobileContainer}>
        
        <p className={questionTextMobile(view)}>
          “{text}”
        </p>
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