'use client'

import React, { useState } from 'react';
import { gql, useQuery, useLazyQuery, useMutation, ApolloProvider } from "@apollo/client";
import { useRouter } from 'next/navigation';

import { client } from '../../pages/quiz';
// import { TimerMobile } from '../shared';
import Header from './header';
import Body, { QuizLoading } from './body';
import { quizContainer } from './styles';

const TIME_SECONDS_TO_COUNTDOWN:number = 24;

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
      average_response_time
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
  const [results, updateResults] = useState({
    times_answered: 0,
    no_response: 0,
    choices: [],
    average_response_time: 0});
  const [selected, updateSelected] = useState(-1);
  const [reset, onReset] = useState(false);
  const [score, updateScore] = useState(0);
  const [responseTime, updateResponseTime] = useState(Date.now());
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
    window.scrollTo(0, 0);

    // reset
    onReset(true);
    updateView('l');
    
    // save response
    const question = q;
    const timeDiff = (Date.now() - responseTime) / 1000;    
    const responsetime = Math.min(timeDiff, TIME_SECONDS_TO_COUNTDOWN);

    if (selected === question.correct.authorid) updateScore(score + 1);

    const variables = {
      quizid: quizid,
      questionid: question.questionid,
      selectedauthorid: selected,
      correctid: question.correct.authorid,
      responsetime
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
    window.scrollTo(0, 0);
    let idx = i + 1; 

    if (idx === 10) {
      updateView('f');
      return;
    }

    const currQuestion = quizquestions[idx].question;
    
    const resultData = await getNextQuestion({ variables: { questionid: currQuestion.questionid } });
    const questionData = resultData.data.questionDetails;

    updateQuestion(questionData);
    updateI(idx);
    updateView('q');
    onReset(false);
    updateSelected(-1);
    updateResponseTime(Date.now())
  }

  const onUpdateSelected = (n:number):void => {
    updateSelected(n);
  }
  
  if (loading || !quizid) {
    return (
        <div className={quizContainer}>
        <QuizLoading />
        </div>
      )
  }
  
  const q = Object.keys(question).length === 0 ? data.questionDetails : question;


  return (
    <div>
      <div className={quizContainer}>
        <Header i={i} />
        <Body
          view={view}
          score={score}
          text={q.text}
          choices={q.choicesRandom}
          avatar_url={q.correct.avatar_url}
          reset={reset}
          results={results}
          source={q.source}
          source_url={q.source_url}
          selected={selected}
          correctAuthor={q.correct.author_name}
          onUpdateView={onUpdateView}
          onUpdateSelected={onUpdateSelected}
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