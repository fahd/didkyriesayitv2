'use client'

import Image from 'next/image';
import { Choices, Timer, TimerMobile, Next } from '../shared';
import React, { useState } from 'react';

// two States
  // quiz Question
  // quiz Answer
  
export default function Quiz() {  
  const [q, updateQ] = useState(1);
  const [selected, updateSelected] = useState(-1);
  const [reset, onReset] = useState(false);
  const [view, updateView] = useState('questions');

  const onUpdateView = () => {
    setTimeout(() => onReset(true), 300);
    setTimeout(() => updateView('results'), 600);
    // push /quiz/[quizHash]/[questionId]?results=true
  }

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

  // choices for response
  const choices = [
    { id: 1, text: 'Kyrie Irving' },
    { id: 2, text: 'Jesus Christ' },
    { id: 3, text: 'ChatGPT' },
    { id: 4, text: 'Barney Stimpson' },
  ];

  // results for response
  const results = [

  ]

  const text = 'I disclose my mysteries to those who are worthy of my mysteries. Do not let your left hand know what your right hand is doing.'
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
          <div className='font-faktProBlond'>{q}/10</div>
        </div>

        {/* Separator */}
        <hr className='my-4 border-separator' />

        {/* Question Body */}
        <div className='flex flex-row my-12'>
          <div className='min-w-[120px]'>
            <Image
              src="/../public/huh.png"
              alt="who this be"
              width={120}
              height={120}
            />
            <div className='my-2'>Jesus Christ</div>
            </div>
          <p className='
            mx-8
            font-faktProBlack
            text-2xl
            text-meta
            '>
            “{text}”
          </p>
          <div>
            <Timer reset={reset} updateView={onUpdateView}></Timer>
          </div>
        </div>
        {/* Sourcing */}

        {/* Choices */}
        {view === 'questions' && (
          <div className={`
            transition-opacity ease-out duration-300
            ${reset ? 'opacity-0' : ''}`
          }>
            < Choices
              reset={reset}
              choices={choices}
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
        {view === 'results' && <div>Results</div>
        }
      </div>
    </div>
  )
}
