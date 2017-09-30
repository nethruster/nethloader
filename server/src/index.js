const express = require('express');
const graphqlHTTP = require('express-graphql');

const config = require('./utils/config');

const authenticationMiddleware = require('./middlewares/authentication');

const schema = require('./graphql/schema');

const app = express();

app.use('/graphql', authenticationMiddleware);

app.use('/graphql', graphqlHTTP(req => ({
  schema: schema,
  graphiql: config.env !== "production",
  context: {
    currentUser: req.user
  }
})));

app.listen(config.port);
