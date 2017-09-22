import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

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
  })
});
