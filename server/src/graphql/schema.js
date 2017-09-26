const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./resolvers');

const typeDefs = [
  require('./types/user'),
  require('./types/image'),
  require('./types/query'),
  require('./types/mutation')
];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
