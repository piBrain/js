'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientFamilyHistory = sequelize.define('PatientFamilyHistory', {
    patientId: DataTypes.INTEGER,
    relationCode: DataTypes.STRING,
    relationCodeSystemName: DataTypes.STRING,
    relationName: DataTypes.STRING,
    relationDeceased: DataTypes.BOOLEAN
  }, );
  PatientFamilyHistory.associate = (models) => {
    PatientFamilyHistory.belongsTo(models.Patient, { foreignKey: 'patientId' })
  }
  return PatientFamilyHistory;
};
