'use client'

/*
  Quiz Details:
    /quiz/[quizHash]/[questionId]
    quizId: string(hash)
    questionIds: [number]

  Fetch Current Question:
    question: {
      questionId: number
      quoteText: string
      quoteAuthor: {
        authorId: number
        authorName: string
      }
      quoteAvatarURL: string
      quoteSource: string
      quoteSourceURL: string
    },
    choices: [
      {
        authorid: number
        authorName: string
      }...
    ],
    results: [
      {
        authorid: number
        authorName: string
        correct: boolean
        percentCorrect: number
      }...
    ]
  */

import React, { useEffect, useState } from 'react';
import { gql, useQuery, ApolloClient, ApolloProvider } from "@apollo/client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { lookup } from "dns";

import client from '../../app/apollo-client';
import { Choices, Timer, TimerMobile, Next } from '../shared';

type Question = {
  question: {
    [question: string]: {
      [questionid:string]: string
    }
  }
} 

const GET_QUESTION = gql`
  query ($questionid: String!){
    questionDetails(questionid: $questionid){
      text
      source_url
      correct {
        authorid
        author_name
        avatar_url
      }
      choices {
        authorid
        author_name
        correct
      }
    }
  }
`;

const Quiz = (props: {
  quizid: string,
  quizquestions: Question[]
}
) => {  
  // 10 random questions
  const { quizid, quizquestions } = props;

  // Local state for UI behavior  
  const [i, updateI] = useState(0);
  const [question, updateQuestion] = useState({});
  const [selected, updateSelected] = useState(-1);
  const [reset, onReset] = useState(false);
  const [view, updateView] = useState('q');

  const onUpdateView = () => {
    onReset(true);
    updateView('a');
    // push /quiz/[quizHash]/[questionId]?results=true
  }

  // results for response
  const results = [

  ]

  // Fetch first question
  const currQuestion = quizquestions[i].question;
  const { data, loading, error } = useQuery(
    GET_QUESTION,
    {
      variables: {
        questionid: currQuestion.questionid
      }
    }
  )
  
  if (loading) {
    return <div>Loading</div>
  }
  
  const q = Object.keys(question).length === 0 ? data.questionDetails : question;

  return (
    <div>
      {/* <header>Home</header> */}
      <div className="
        max-w-4xl
        m-auto
        h-screen
        min-h-full
        pt-16
        ">
        
        {/* Top Bar */}
        <div className='
          flex
          flex-row
          justify-between
          align-center
        '>
          <div className='font-gtSuperBold text-meta text-xl'>Did Kyrie Say It?</div>
          <div className='font-faktProBlond'>{i + 1}/10</div>
        </div>

        {/* Separator */}
        <hr className='my-4 border-separator' />

        {/* Question Body */}
        <div className='flex flex-row my-12'>
          <div className='min-w-[120px]'>
            {view === 'q'
              ? <Image
                  className={``}
                  src={'/../public/huh.png'}
                  alt="who this be"
                  width={120}
                  height={120} />
              : <Image
                  src={q.correct.avatar_url} 
                  alt="who this be" 
                  width={120}
                  height={120} />
            }
            
            {view === 'a' && <div className='my-2 text-center text-meta font-faktProBlack'>{q.correct.author_name}</div>}
            </div>
          <p className='
            mx-8
            font-faktProBlack
            text-2xl
            grow
            text-meta
            '>
            “{q.text}”
          </p>
          <div>
            <Timer reset={reset} updateView={onUpdateView}></Timer>
          </div>
        </div>
        {/* Sourcing */}

        {/* Choices */}
        {/* <div className={`
            transition-opacity ease-out duration-300
            ${reset ? 'opacity-0' : ''}`
          }></div> */}
        {view === 'q' && (
          <div className={``}>
            < Choices
              reset={reset}
              choices={q.choices}
              selected={selected}
              updateSelected={updateSelected}
              updateView={onUpdateView}
            />

            {/* Question Timer */}
            <TimerMobile reset={reset} updateView={onUpdateView} />

            {/* Finish question early */}
            <Next updateView={onUpdateView} selected={selected > -1} />
          </div>
          )
        }
        
        {/* Results */}
        {view === 'a' && <div>Results</div>
        }
      </div>
    </div>
  )
}

// export default Quiz;

export default function QuizPage(props: {
  quizid: string
  quizquestions: Question[]
}) {
  const { quizid, quizquestions } = props;
  return (
    <ApolloProvider client={client}>
      <Quiz
        quizid={quizid}
        quizquestions={quizquestions}
      />
    </ApolloProvider>
  )
}