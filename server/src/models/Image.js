module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
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
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };

  return Images;
};
