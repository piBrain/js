'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientMedicalProblems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: { model: 'Patients', key: 'id' },
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      code: {
        type: Sequelize.STRING,
      },
      codeSystemName: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING
      },
      categoryCode: {
        type: Sequelize.STRING
      },
      categoryCodeSystemName: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      healthStatus: {
        type: Sequelize.STRING
      },
      status: {
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
      queryInterface.addConstraint('PatientMedicalProblems', ['codeSystemName', 'code'], {
        type: 'check',
        where: {
          $or: [
            {$and: [{ code: { $ne: null }},{ codeSystemName: { $ne: null } }] },
            { $and: [ { code: { $eq: null } }, { codeSystemName: { $eq: null } } ] }
          ]
        }
      })
      queryInterface.addConstraint('PatientMedicalProblems', ['categoryCode', 'categoryCodeSystemName'], {
        type: 'check',
         where: {
          $or: [
            {$and: [{ categoryCode: { $ne: null }},{ categoryCodeSystemName: { $ne: null } }] },
            { $and: [ { categoryCode: { $eq: null } }, { categoryCodeSystemName: { $eq: null } } ] }
          ] 
         }
      })
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PatientMedicalProblems');
  }
};
