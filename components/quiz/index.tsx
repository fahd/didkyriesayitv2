'use client'

import React, { useState } from 'react';
import { gql, useQuery, useLazyQuery, useMutation, ApolloProvider } from "@apollo/client";
import { useRouter } from 'next/navigation';

import client from '../../app/apollo-client';
// import { TimerMobile } from '../shared';
import QuizHeader from './QuizHeader';
import QuizBody, { QuizLoading } from './QuizBody';

const TIME_SECONDS_TO_COUNTDOWN = 24;
const TIME_TO_COUNTDOWN = TIME_SECONDS_TO_COUNTDOWN * 1000;

type Question = {
  question: {
    [question: string]: {
      [questionid:string]: string
    }
  }
} 

const GET_QUESTION = gql`
  query ($questionid: String!){
    questionDetails(questionid: $questionid) {
      questionid
      text
      source_url
      source
      correct {
        authorid
        author_name
        avatar_url
      }
      choicesRandom {
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
      $responsetime: Float!
    ){
    saveResponse(
      quizid: $quizid
      questionid: $questionid 
      selectedauthorid: $selectedauthorid
      correctid: $correctid
      responsetime: $responsetime
    ) {
      responseid
    }
  }
`;

const GET_QUESTION_RESULTS = gql`
  query ($questionid: String!){
    questionDetails(questionid: $questionid){
      times_answered
      no_response
      choices {
        authorid
        author_name
        correct
        times_selected
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
  const [results, updateResults] = useState({});
  const [selected, updateSelected] = useState(-1);
  const [reset, onReset] = useState(false);
  const [view, updateView] = useState('q');
  
  // Queries
  const currQuestion = quizquestions[i].question;
  const [getResults, resultsQuery] = useLazyQuery(GET_QUESTION_RESULTS)
  const [getNextQuestion, nextQuestionQuery] = useLazyQuery(GET_QUESTION)
  const { data, loading, error } = useQuery(
    GET_QUESTION, { variables: { questionid: currQuestion.questionid } }
  )

  // Mutations
  const [saveResponse, responseMutation] = useMutation(SAVE_RESPONSE);

  const onUpdateView = async () => {
    // push /quiz/[quizHash]/[questionId]?results=true

    // reset
    onReset(true);
    updateView('l');
    
    // save response
    const question = q;

    // hack, response time via window object since context moves time at 3x the speed
    const responsetime: string = window.localStorage.getItem('time');
    
    const variables = {
      quizid: quizid,
      questionid: question.questionid,
      selectedauthorid: selected,
      correctid: question.correct.authorid,
      responsetime: (TIME_TO_COUNTDOWN - parseInt(responsetime))/1000
    };
    await saveResponse({ variables })  
  
    // get results
    const resultData = await getResults({ variables: { questionid: question.questionid } })
    const questionData = resultData.data.questionDetails;
    updateResults(questionData);
    updateView('r');
  }

  const onUpdateQuestion = async () => {
    updateView('l');
    let idx = i + 1; 
    const currQuestion = quizquestions[idx].question;
    
    const resultData = await getNextQuestion({ variables: { questionid: currQuestion.questionid } });
    const questionData = resultData.data.questionDetails;

    updateQuestion(questionData);
    updateI(idx);
    updateView('q');
    onReset(false);
    updateSelected(-1);
  }

  
  if (loading || !quizid) {
    return <QuizLoading/>
  }
  
  const q = Object.keys(question).length === 0 ? data.questionDetails : question;

  return (
    <div>
      <div className="max-w-4xl m-auto h-screen min-h-full pt-16">
        <QuizHeader i={i} />
        {/* <TimerMobile reset={reset}/> */}
        <QuizBody
          view={view}
          text={q.text}
          choices={q.choicesRandom}
          avatar_url={q.correct.avatar_url}
          reset={reset}
          results={results}
          selected={selected}
          correctAuthor={q.correct.author_name}
          onUpdateView={onUpdateView}
          onUpdateSelected={updateSelected}
          onUpdateQuestion={onUpdateQuestion}
          idx={i}
        />
      </div>
    </div>
  )
}

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