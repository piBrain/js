'use strict';
module.exports = function(sequelize, DataTypes) {
  var Api = sequelize.define('Api', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Api;
};
