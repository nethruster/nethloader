const nanoid = require('nanoid');

module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Image', {
    id: {
      type: DataTypes.CHAR(10),
      primaryKey: true
    },
    extension: {
      type: DataTypes.STRING(5),
      allowNull: false
    }
  },
  {
    hooks: {
      beforeValidate(image, options) {
        image.id = nanoid(10)
      }
    }
  });

  Images.associate = (models) => {
    Images.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });
  };

  return Images;
};
