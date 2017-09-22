import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(user) {
        return user.id
      }
    },
    name: {
      type: GraphQLString,
      resolve(user) {
        return user.name
      }
    },
    email: {
      type: GraphQLString,
      resolve(user) {
        return user.email
      }
    },
    apiKey: {
      type: GraphQLString,
      resolve(user) {
        return user.apiKey
      }
    },
    isAdmin: {
      type: GraphQLBoolean,
      resolve(user) {
        return user.isAdmin
      }
    }
  })
});
