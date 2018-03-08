'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientDemographics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      sex: {
        type: Sequelize.ENUM(['Female', 'Male', 'Unknown', 'Other'])
      },
      race: {
        type: Sequelize.STRING
      },
      isDeceased: {
        type: Sequelize.BOOLEAN
      },
      homePhone: {
        type: Sequelize.STRING
      },
      officePhone: {
        type: Sequelize.STRING
      },
      mobilePhone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.JSONB
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
    return queryInterface.dropTable('PatientDemographics');
  }
};
