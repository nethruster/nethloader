const db = require('../../../models');

console.log(db)

module.exports = {
  users: (parent, args) => db.User.findAll({ where: args }),
  user: (parent, args) => db.User.findOne({ where: args }),
  images: (parent, args) => db.Image.findAll({ where: args }),
  image: (parent, args) => db.Image.findOne({ where: args })
}
