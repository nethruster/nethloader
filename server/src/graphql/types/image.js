const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} = require('graphql');

const db = require('../../models');

const User = require('./user');
console.log(User)

const type = new GraphQLObjectType({
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
      type: User.type,
      resolve(image) {
        return image.getUser();
      }
    }
  })
});

const field = {
  type: new GraphQLList(type),
  args: {
    id: {
      type: GraphQLString
    }
  },
  resolve(root, args) {
    return db.Image.findAll({ where: args });
  }
}

module.exports = {
  type,
  field
}
