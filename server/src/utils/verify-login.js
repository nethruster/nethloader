const tokenUtils = require('./token');
const db = require('../models');

module.exports = async function(token) {
  let data = await tokenUtils.verify(token);
  let user = await db.User.findById(data.id);

  if(user === null) {
    throw new Error("Invalid user")
  }
  if(data.sessionSignature !== user.sessionSignature) {
    throw new Error("Invalid sessionSignature")
  }

  return user;
}
