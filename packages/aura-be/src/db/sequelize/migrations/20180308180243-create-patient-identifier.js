'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientIdentifiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM(['MR'])
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {model: 'Patients', key:'id'}
      },
      identifier: {
        type: Sequelize.STRING
      },
      patientDemographicsId: {
        type: Sequelize.INTEGER,
        references: { model: 'PatientDemographics', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PatientIdentifiers');
  }
};
