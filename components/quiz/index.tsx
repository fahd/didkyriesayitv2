'use client'

import React, { useState } from 'react';
import { gql, useQuery, useMutation, ApolloProvider } from "@apollo/client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
      questionid
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

const SAVE_RESPONSE = gql`
  mutation (
      $quizid: ID! 
      $questionid: ID! 
      $selectedauthorid: ID!
      $correctid: ID!
    ){
    saveResponse(
      quizid: $quizid
      questionid: $questionid 
      selectedauthorid: $selectedauthorid
      correctid: $correctid
    ) {
      responseid
    }
  }
`;

const GET_QUESTION_RESULTS = gql`
  query ($questionid: String!){
    questionDetails(questionid: $questionid){
      times_answered
      choices {
        authorid
        author_name
        correct
        questionChoiceData {
          times_selected
          percent_correct
        }
      }
    }
  }
`;

const Quiz = (props: {
  quizid: string,
  quizquestions: Question[]
}
) => {  
  const { quizid, quizquestions } = props;
  const [i, updateI] = useState(0);
  const [question, updateQuestion] = useState({});
  const [selected, updateSelected] = useState(-1);
  const [reset, onReset] = useState(false);
  const [view, updateView] = useState('q');
  
  // Queries
  const currQuestion = quizquestions[i].question;
  const { data, loading, error } = useQuery(
    GET_QUESTION,
    {
      variables: {
        questionid: currQuestion.questionid
      }
    }
  )

  // Mutations
  const [saveResponse, responseMutation] = useMutation(SAVE_RESPONSE);
  const [getResults, resultsQuery] = useMutation(SAVE_RESPONSE);

  const onUpdateView = async () => {
    // push /quiz/[quizHash]/[questionId]?results=true
    // reset
    onReset(true);
    updateView('l');
  
    // save response
    const question = q;
    const variables = {
      quizid: quizid,
      questionid: question.questionid,
      selectedauthorid: selected,
      correctid: question.correct.authorid,
    };
  
    await saveResponse({ variables })  
    
      // get results
  
      // updateView
      // updateView('a'); 
  }

  
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
            />

            {/* Question Timer */}
            <TimerMobile reset={reset} />

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