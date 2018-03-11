'use strict';
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.INTEGER, },
    nonce: DataTypes.STRING,
  },);

  Session.associate = (models) => {
    Session.belongsTo(models.User, {foreignKey: 'userId', sourceKey: 'id'})
  }
  return Session;
};
