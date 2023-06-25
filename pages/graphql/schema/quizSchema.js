import { gql } from 'graphql-tag';

const quizSchema = gql`
  extend type Query {
    generateQuiz: Quiz!
    questionDetails(questionid: String!): Question!
  }
  extend type Mutation {
    saveResponse(quizid: ID! questionid: ID! selectedauthorid: ID! correctid: ID! responsetime: Float!): Response!
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
    source: String!
    correct: Author!
    choices: [QuestionChoice!]!
    choicesRandom: [QuestionChoice!]!
    times_answered: Int!
    no_response: Int!
  }

  type QuestionChoice {
    authorid: ID!
    questionid: ID!
    author_name: String!
    correct: Boolean!
    times_selected: Int!
  }

  type Response {
    responseid: ID!
    quizid: ID!
    questionid: ID!
    selected: ID!
    iscorrect: Boolean!
    responsetime: Float!
  }

  type QuizQuestion {
    quizid: ID!
    questionid: ID!
    quizquestionid: ID!
    question: Question!
  }
`;

export default quizSchema;
