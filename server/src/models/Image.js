module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Image', {
    id: {
      type: DataTypes.CHAR(10),
      primaryKey: true
    },
    extension: {
      type: DataTypes.STRING(5)
    }
  });

  Images.associate = (models) => {
    Images.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });
  };

  return Images;
};
