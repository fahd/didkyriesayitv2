import { gql } from 'graphql-tag';
import quizSchema from './quizSchema.js';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, quizSchema];
