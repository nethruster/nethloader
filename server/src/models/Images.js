module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Images', {
    id: {type: DataTypes.BIGINT, primaryKey: true},
    email: {
      type: DataTypes.STRING(45),
      validate: {
        isEmail: true
      },
    },
    name: DataTypes.STRING(45),
    apiKey: DataTypes.CHAR(24),
    isAdmin: DataTypes.BOOLEAN
  });

  Images.associate = (models) => {
    Images.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };

  return Images;
};
