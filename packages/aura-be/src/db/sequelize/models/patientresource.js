'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientResource = sequelize.define('PatientResource', {
    type: DataTypes.ENUM('TRANSCRIPTION', 'LAB_RESULT', 'IMAGING'),
    s3Url: DataTypes.STRING,
    patientId: DataTypes.INTEGER
  });
  PatientResource.associate = (models) => {
    PatientResource.belongsTo(models.Patient, { foreignKey: 'patientId' })
  }
  return PatientResource;
};
