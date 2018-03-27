'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientAllergies = sequelize.define('PatientAllergies', {
    typeCode: DataTypes.STRING,
    typeCodeSystemName: DataTypes.STRING,
    typeName: DataTypes.STRING,
    substanceCode: DataTypes.STRING,
    substanceCodeSystemName: DataTypes.STRING,
    substanceName: DataTypes.STRING,
    statusCode: DataTypes.STRING,
    statusCodeSystemName: DataTypes.STRING,
    statusName: DataTypes.STRING,
    patientId: DataTypes.INTEGER
  },);
  PatientAllergies.associate = (models) => {
    PatientAllergies.belongsTo(models.Patient, {foreignKey: 'patientId' })
  }
  return PatientAllergies;
};
