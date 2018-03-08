'use strict';
module.exports = function(sequelize, DataTypes) {
  var MedicalProfessional = sequelize.define('MedicalProfessional', {
    npi: DataTypes.INTEGER,
    credentials: DataTypes.ARRAY(DataTypes.STRING),
    years: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        console.log(models)
        // associations can be defined here
      }
    }
  });
  return MedicalProfessional;
};
