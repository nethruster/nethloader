import express from 'express';
import graphqlHTTP from 'express-graphql';

import { buildSchema } from 'graphql';

import config from './utils/config';

import schema from './graphql/schema';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: config.env !== "production"
}));

app.listen(config.port);
