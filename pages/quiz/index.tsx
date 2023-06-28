import { gql, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Quiz from '../../components/quiz';
import { Meta } from '../../components/shared/';
import Head from 'next/head'
const isProd = process.env.NODE_ENV === 'production';

export const client = new ApolloClient({
    uri: `http://localhost:3000/api/graphql`,
    cache: new InMemoryCache(),
});

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
  
export default function QuizContainer (props: {
  quizid: string
  quizquestions: QuizQuestion[]
}) {
  const { quizid, quizquestions } = props;
  return (
    <div>
      <Meta/>
      <Quiz quizid={quizid} quizquestions={quizquestions} />
    </div>
  )
}


export async function getServerSideProps() {
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

