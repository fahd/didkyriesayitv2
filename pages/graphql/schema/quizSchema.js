import { gql } from 'graphql-tag';

const quizSchema = gql`
  extend type Query {
    generateQuiz: Quiz!
    questionDetails(questionid: String!): Question!
  }

  type Author {
    authorid: ID!
    author_name: String!
    avatar_url: String!
  }

  type Quiz {
    quizid: ID!
    quizquestions: [QuizQuestion!]!
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
