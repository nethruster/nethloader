module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Image', {
    extension: {
      type: DataTypes.STRING(5)
    },
    publicId: {
      type:  DataTypes.CHAR(10),
      unique: true
    },
  });

  Images.associate = (models) => {
    Images.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });
  };

  return Images;
};
