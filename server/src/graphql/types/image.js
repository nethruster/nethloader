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
      type: GraphQLInt,
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
    publicId: {
      type: GraphQLString,
      resolve(image) {
        return image.publicId
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
