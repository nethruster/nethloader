const bcrypt = require('bcrypt');

const db = require('../../../models');
const tokenUtils = require('../../../utils/token');

module.exports = async (parent, args) => {
  let user = await db.User.findOne({where: {
    email: args.email
  }});
  
  if (await bcrypt.compare(args.password, user.password)) {
    return await tokenUtils.generateUserToken(user, '1d');
  }
  
  throw new Error("Not valid email or password");
}
