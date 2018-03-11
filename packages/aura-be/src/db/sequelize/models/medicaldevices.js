'use strict';
module.exports = function(sequelize, DataTypes) {
  var MedicalDevices = sequelize.define('MedicalDevices', {
    status: DataTypes.ENUM(['Active', 'Completed']),
    startDate: DataTypes.DATE,
    productCode: DataTypes.STRING,
    productName: DataTypes.STRING,
    codeSystemName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MedicalDevices;
};
