'use strict';

import fs        from 'fs';
import path      from 'path';
import Sequelize from 'sequelize';
import config    from '../utils/config';

const basename  = path.basename(module.filename);
var db          = {};

var sequelize = new Sequelize(config.database.ip, config.database.username, config.database.password);

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

export default db;
