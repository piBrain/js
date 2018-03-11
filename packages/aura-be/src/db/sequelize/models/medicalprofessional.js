'use strict';
module.exports = function(sequelize, DataTypes) {
  var MedicalProfessional = sequelize.define('MedicalProfessional', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    npi: DataTypes.INTEGER,
    credentials: DataTypes.ARRAY(DataTypes.STRING),
    years: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MedicalProfessional;
};
