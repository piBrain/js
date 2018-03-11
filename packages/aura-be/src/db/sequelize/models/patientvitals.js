'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientVitals = sequelize.define('PatientVitals', {
    patientId: DataTypes.INTEGER,
    code: DataTypes.STRING,
    codeSystemName: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    interpretation: DataTypes.STRING,
    dateTimeTaken: DataTypes.DATE,
    value: DataTypes.FLOAT,
    units: DataTypes.STRING
  }, );

  PatientVitals.associate = (models) => {
    PatientVitals.belongsTo(models.Patient, { sourceKey: 'patientId' })
  }
  return PatientVitals;
};
