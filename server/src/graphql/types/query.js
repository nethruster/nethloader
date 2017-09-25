module.exports = `
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
`
