const Faker = require('faker');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

module.exports = async function(db) {
  let passHash = await bcrypt.hash("1234", 12);
  db.sequelize.sync({force: true}).then(()=> {
    for(let i = 0; i < 10; i++ ) {
      db.User.create({
        id: nanoid(10),
        name: Faker.name.firstName(),
        password: passHash,
        email: Faker.internet.email(),
        apiKey: nanoid(24),
        isAdmin: true
      }).then(user => user.createImage({
        id: nanoid(10),
        extension: "jpg"
      }));
    }
  })
}
