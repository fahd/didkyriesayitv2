import 'dotenv/config';
import {
  ApolloServer,
} from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import models from '../../lib/graphql/models';
import typeDefs from '../../lib/graphql/schema';
import resolvers from '../../lib/graphql/resolvers';

const isProd = process.env.NODE_ENV === 'production';

const host = isProd ? process.env.PROD_HOST : process.env.DEV_HOST;
const port = isProd ? process.env.PROD_PORT : process.env.DEV_PORT;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    return {
      message:'Apollo Error:',
      error
    };
  },
  cors: {
    origin: `http://${host}:${port}`,
    credentials: true,
  },
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({
    req,
    res,
    models,
    secret: process.env.SECRET,
  }),
});