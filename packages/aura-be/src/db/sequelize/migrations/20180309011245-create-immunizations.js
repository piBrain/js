'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientImmunizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      routeName: {
        type: Sequelize.STRING
      },
      productManufacturer: {
        type: Sequelize.STRING
      },
      productCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productCodeSystemName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productLotNumber: {
        type: Sequelize.STRING
      },
      doseQuantity: {
        type: Sequelize.STRING
      },
      doseUnits: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Patients', key: 'id' }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PatientImmunizations');
  }
};
