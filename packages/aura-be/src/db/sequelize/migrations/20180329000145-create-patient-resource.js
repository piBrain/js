'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientResources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM(['TRANSCRIPTION', 'LAB_RESULT', 'IMAGING']),
        allowNull:false
      },
      s3Url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: { model: 'Patients', key: 'id' }
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
    return queryInterface.dropTable('PatientResources');
  }
};
