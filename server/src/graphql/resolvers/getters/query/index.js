const {GraphQLError} = require('graphql');
const db = require('../../../../models');

const users = require('./users');
const user = require('./user');
const images = require('./images');
const image = require('./image')

module.exports = {
  users,
  user,
  images,
  image
}
