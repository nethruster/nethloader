const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./resolvers');

const typeDefs = `
type User {
  id: String
  name: String
  email: String
  apiKey: String
  isAdmin: Boolean
  images: [Image]
  createdAt: String
}
type Image {
  id: String
  extension: String
  user: User
  createdAt: String
}
type Query {
  users(
    id: String,
    name: String,
    email: String,
    apiKey: String,
    isAdmin: Boolean
  ): [User]
  user(id: String, email: String): User
  images(
    id: String,
    extension: String
  ): [Image]
  image(id: String!): Image
}
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
