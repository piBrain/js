'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientVitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Patients', key: 'id' }
      },
      code: {
        type: Sequelize.STRING
      },
      codeSystemName: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      interpretation: {
        type: Sequelize.STRING
      },
      dateTimeTaken: {
        type: Sequelize.DATE
      },
      value: {
        type: Sequelize.FLOAT
      },
      units: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addConstraint('PatientVitals', ['codeSystemName', 'code'], {
        type: 'check',
        where: {
          $or: [
            {$and: [{ code: { $ne: null }},{ codeSystemName: { $ne: null } }] },
            { $and: [ { code: { $eq: null } }, { codeSystemName: { $eq: null } } ] }
          ]
        }
      })
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PatientVitals');
  }
};
