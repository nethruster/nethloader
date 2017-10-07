const {GraphQLError} = require('graphql');

const db = require('../../../../models');

module.exports = function(parent, args, {currentUser}) {
  if(currentUser) {
    if(args.id === currentUser.id || args.email === currentUser.email) {
      return currentUser;
    }

    if(currentUser.isAdmin) {
      return db.User.findOne({ where: args })
    } else {
      throw new GraphQLError("Unauthorized")
    }
  } else {
    throw new GraphQLError("Unauthorized")
  }
}
