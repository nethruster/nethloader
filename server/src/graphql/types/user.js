import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

import Image from './image';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString,
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
    },
    images: {
      type: new GraphQLList(Image),
      resolve(user) {
        return user.getImages();
      }
    }
  })
});
