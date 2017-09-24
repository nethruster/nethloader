const express = require('express');
const graphqlHTTP = require('express-graphql');

const config = require('./utils/config');

const schema = require('./graphql/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: config.env !== "production"
}));

app.listen(config.port);
