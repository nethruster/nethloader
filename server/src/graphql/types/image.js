import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import User from './user';

export default new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve(image) {
        return image.id
      }
    },
    extension: {
      type: GraphQLString,
      resolve(image) {
        return image.extension
      }
    },
    user: {
      type: User,
      resolve(image) {
        return image.getUser();
      }
    }
  })
});
