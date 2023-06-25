import { ApolloProvider, gql } from "@apollo/client";
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
  // console.log('quizid',quizid);
  // console.log('quizquestions',quizquestions);
  return (
    // <div>1</div>
    <div>
      <Head>
        <title>Did Kyrie Say It?</title>
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

