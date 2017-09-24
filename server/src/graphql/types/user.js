const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const db = require('../../models');

const Image = require('./image');

const type = new GraphQLObjectType({
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
      type: new GraphQLList(Image.type),
      resolve(user) {
        return user.getImages();
      }
    }
  })
});

const field = {
  type: new GraphQLList(type),
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
};

module.exports = {
  type,
  field
}
