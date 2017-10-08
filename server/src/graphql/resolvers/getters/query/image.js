const {GraphQLError} = require('graphql');

const db = require('../../../../models');

module.exports = function(parent, args) {
  return db.Image.findOne({ where: args });
}
