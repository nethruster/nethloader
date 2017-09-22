import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

import db from '../models';

import User from './user';
import Image from './image';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: { 
      type: new GraphQLList(User),
      args: {
        id: {
          type: GraphQLInt
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
        return db.User.findAll({where: args});
      }
    },
    images: {
      type: new GraphQLList(Image),
      args: {
        id: {
          type: GraphQLInt
        },
        publicId: {
          type: GraphQLString
        }
      },
      resolve(root, args) {
        return db.Image.findAll({where: args});
      }
    }
})
})

export default new GraphQLSchema({
  query: Query
});
