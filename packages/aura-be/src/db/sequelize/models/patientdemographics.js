'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientDemographics = sequelize.define('PatientDemographics', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATE,
    sex: DataTypes.ENUM(['Male', 'Female', 'Other', 'Unknown']),
    race: DataTypes.STRING,
    isDeceased: DataTypes.BOOLEAN,
    homePhone: DataTypes.STRING,
    officePhone: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.JSONB,
    patientId: DataTypes.INTEGER
  }, );
  PatientDemographics.associate = (models) => {
  }
  return PatientDemographics;
};
