'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientMedicalProblems = sequelize.define('PatientMedicalProblems', {
    patientId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    code: DataTypes.STRING,
    codeSystemName: DataTypes.STRING,
    name: DataTypes.STRING,
    categoryCode: DataTypes.STRING,
    categoryCodeSystemName: DataTypes.STRING,
    category: DataTypes.STRING,
    healthStatus: DataTypes.STRING,
    status: DataTypes.STRING
  }, );
  PatientMedicalProblems.associate = (models) => {
    PatientMedicalProblems.belongsTo(models.Patient, { foreignKey: 'patientId' })
  }
  return PatientMedicalProblems;
};
