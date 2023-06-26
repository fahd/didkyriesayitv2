import { gql } from "@apollo/client";
import Quiz from '../../components/quiz';
import client from '../../app/apollo-client';
import Head from 'next/head'

const QUERY_NEW_QUIZ = gql`
  query {
    generateQuiz {
      quizid
      quizquestions {
        question {
            questionid
          }
        }
      }
    }
`;

type QuizQuestion = {
  question: {
    [question: string]: {
      [questionid:string]: string
    }
  }
} 
  
export default function QuizPage(props: {
  quizid: string
  quizquestions: QuizQuestion[]
}) {
  const { quizid, quizquestions } = props;
  return (
    <div>
      <Head>
        <title>Did Kyrie Say It?</title>
        <link rel="canonical" href="https://www.didkyriesayit.com"/>
        <link rel="icon" href="https://didkyriesayit.s3.us-east-2.amazonaws.com/icons/favicon-32x32.png" type="image/x-icon"/>
        <link href="https://didkyriesayit.s3.us-east-2.amazonaws.com/icons/apple-touch-icon.png" rel="apple-touch-icon"/>
        <meta content="Did Kyrie Say it?"/>
        <meta content="Did Kyrie Say it?" property="og:description"/>
        <meta content="Did Kyrie Say it?" property="twitter:description"/>
      </Head>
      <Quiz quizid={quizid} quizquestions={quizquestions} />
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: QUERY_NEW_QUIZ,
    fetchPolicy: "no-cache" 
  })

  const { generateQuiz: { quizid, quizquestions } } = data;

  return {
    props: {
      quizid,
      quizquestions
    }
  }
}

