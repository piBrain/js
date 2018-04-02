'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientIdentifier = sequelize.define('PatientIdentifier', {
    type: DataTypes.ENUM('MR', 'EHRID', 'NIST'),
    patientId: DataTypes.INTEGER,
    identifier: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  PatientIdentifier.associate = (models) => {
    PatientIdentifier.belongsTo(models.Patient, { foreignKey: 'patientId' })
  }
  return PatientIdentifier;
};
