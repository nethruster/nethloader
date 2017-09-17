import express from 'express';
import graphqlHTTP from 'express-graphql';

var { buildSchema } = require('graphql');

import config from './utils/config';

import schema from './graphql/schema';
import root from './graphql/root';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: config.env !== "production"
}));

app.listen(config.port);
