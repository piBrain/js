'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientAllergies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeCode: {
        type: Sequelize.STRING
      },
      typeCodeSystemName: {
        type: Sequelize.STRING
      },
      typeName: {
        type: Sequelize.STRING
      },
      substanceCode: {
        type: Sequelize.STRING
      },
      substanceCodeSystemName: {
        type: Sequelize.STRING
      },
      substanceName: {
        type: Sequelize.STRING
      },
      statusCode: {
        type: Sequelize.STRING
      },
      statusCodeSystemName: {
        type: Sequelize.STRING
      },
      statusName: {
        type: Sequelize.STRING
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    }).then(() => {
      queryInterface.addConstraint('PatientAllergies', ['typeCodeSystemName', 'typeCode'], {
        type: 'check',
        where: {
          $or: [
            {$and: [{ typeCode: { $ne: null }},{ typeCodeSystemName: { $ne: null } }] },
            { $and: [ { typeCode: { $eq: null } }, { typeCodeSystemName: { $eq: null } } ] }
          ]
        }
      })

      queryInterface.addConstraint('PatientAllergies', ['substanceCodeSystemName', 'substanceCode'], {
        type: 'check',
        where: {
          $or: [
            {$and: [{ substanceCode: { $ne: null }},{ substanceCodeSystemName: { $ne: null } }] },
            { $and: [ { substanceCode: { $eq: null } }, { substanceCodeSystemName: { $eq: null } } ] }
          ]
        }
      })
    })
    queryInterface.addConstraint('PatientAllergies', ['statusCodeSystemName', 'statusCode'], {
      type: 'check',
      where: {
        $or: [
          {$and: [{ statusCode: { $ne: null }},{ statusCodeSystemName: { $ne: null } }] },
          { $and: [ { statusCode: { $eq: null } }, { statusCodeSystemName: { $eq: null } } ] }
        ]
      }
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PatientAllergies');
  }
};
