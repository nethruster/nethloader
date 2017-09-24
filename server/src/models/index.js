'use strict';

import fs        from 'fs';
import path      from 'path';
import Sequelize from 'sequelize';
import nanoid from 'nanoid';
import config    from '../utils/config';

const isDevelopment = config.env === "development"
const basename  = path.basename(module.filename);
var db          = {};

var sequelize = new Sequelize(config.database);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

if (isDevelopment) {
  var Faker = require('faker');
  var bcrypt = require('bcrypt');
  (async function() {
    let passHash = await bcrypt.hash("1234", 12);
    sequelize.sync({force: true}).then(()=> {
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
  })();
}

export default db;
