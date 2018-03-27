'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientImmunizations = sequelize.define('PatientImmunizations', {
    dateTime: DataTypes.DATE,
    routeName: DataTypes.STRING,
    productManufacturer: DataTypes.STRING,
    productCode: DataTypes.STRING,
    productCodeSystemName: DataTypes.STRING,
    productName: DataTypes.STRING,
    productLotNumber: DataTypes.STRING,
    doseQuantity: DataTypes.STRING,
    doseUnits: DataTypes.STRING,
    patientId: DataTypes.INTEGER
  },);
  PatientImmunizations.associate = (models) => {
    PatientImmunizations.belongsTo(models.Patient, {foreignKey: 'patientId' })
  }
  return PatientImmunizations;
};
