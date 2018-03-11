'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientFamilyHistories', {
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
      relationCode: {
        type: Sequelize.STRING
      },
      relationCodeSystemName: {
        type: Sequelize.STRING
      },
      relationName: {
        type: Sequelize.STRING
      },
      relationDeceased: {
        type: Sequelize.BOOLEAN
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
      queryInterface.addConstraint('PatientFamilyHistories', ['relationCodeSystemName', 'relationCode'], {
        type: 'check',
        where: {
          $or: [
            {$and: [{ relationCode: { $ne: null }},{ relationCodeSystemName: { $ne: null } }] },
            { $and: [ { relationCode: { $eq: null } }, { relationCodeSystemName: { $eq: null } } ] }
          ]
        }
      })
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PatientFamilyHistories');
  }
};
