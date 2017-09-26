const bcrypt = require('bcrypt');

const db = require('../../../models');
const tokenUtils = require('../../../utils/token');

module.exports = async (parent, args) => {
  let user = await db.User.create({
    name: args.name,
    email: args.email,
    password: await bcrypt.hash(args.password, 12),
  })

  return await tokenUtils.generateUserToken(user, '1d');
}
