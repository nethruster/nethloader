const Faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = async function(db) {
  let passHash = await bcrypt.hash("1234", 12);
  db.sequelize.sync({force: true}).then(()=> {
    for(let i = 0; i < 10; i++ ) {
      db.User.create({
        name: Faker.name.firstName(),
        password: passHash,
        email: Faker.internet.email(),
        isAdmin: true
      }).then(user => user.createImage({
        extension: "jpg"
      }));
    }
  })
}
