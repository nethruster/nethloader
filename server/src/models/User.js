const nanoid = require('nanoid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.CHAR(10),
      primaryKey: true
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING(45),
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    name: DataTypes.STRING(45),
    apiKey: {
      type: DataTypes.CHAR(24)
    },
    sessionSignature: {
      type: DataTypes.CHAR(24),
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }

  },
  {
    hooks: {
      beforeValidate(user, options) {
        user.id = nanoid(10);
        user.apiKey = nanoid(24);
        user.sessionSignature = nanoid(24);
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Image);
  };

  return User;
};
