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
    choices: [QuestionChoice!]!
  }

  type QuestionChoice {
    authorid: ID!
    author_name: String!
    correct: Boolean!
  }

  type QuestionData {
    totalAnswered: Int!
    percentCorrect: Int!
    percentWrong: Int!
  }

  type Response {
    responseid: ID!
    quizid: ID!
    questionid: ID!
    selected: Author!
  }

  type QuizQuestion {
    quizid: ID!
    questionid: ID!
    quizquestionid: ID!
    question: Question!
  }
`;

export default quizSchema;
