const {GraphQLError} = require('graphql');

const db = require('../../../../models');

module.exports = function(parent, args, {currentUser}) {
  if(currentUser && currentUser.isAdmin) {
    return db.User.findAll({ where: args })
  } else {
    throw new GraphQLError("Unauthorized")
  }
}
