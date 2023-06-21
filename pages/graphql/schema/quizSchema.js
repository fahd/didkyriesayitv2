import { gql } from 'graphql-tag';

const quizSchema = gql`
  extend type Query {
    generateQuiz: Quiz!
  }

  type Author {
    authorid: ID!
    author_name: String!
    avatar_url: String!
  }

  type Quiz {
    quizid: ID!
    questions: [QuizQuestion!]!
  }

  type Question {
    questionid: ID!
    text: String!
    source_url: String!
    correct: Author!
    incorrect1: Author!
    incorrect2: Author!
    incorrect3: Author!
  }

  type QuizQuestion {
    quizid: ID!
    questionid: ID!
    quizquestionid: ID!
    question: Question!
  }
`;

export default quizSchema;
