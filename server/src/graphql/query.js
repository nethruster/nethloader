import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

import db from '../models';

import User from './types/user';
import Image from './types/image';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      args: {
        id: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        apiKey: {
          type: GraphQLString
        },
        isAdmin: {
          type: GraphQLBoolean
        }
      },
      resolve(root, args) {
        return db.User.findAll({ where: args });
      }
    },
    images: {
      type: new GraphQLList(Image),
      args: {
        id: {
          type: GraphQLString
        },
        publicId: {
          type: GraphQLString
        }
      },
      resolve(root, args) {
        return db.Image.findAll({ where: args });
      }
    }
  })
})
