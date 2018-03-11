'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('Roles', {
      userId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
      },
      roleAttributes: { type: Sequelize.JSONB, allowNull: false, defaultValue: '{}'},
      type: { type: Sequelize.ENUM(['medicalProfessional', 'administrator', 'adminstrativeStaff']), allowNull: false},
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      medicalProfessionalId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: { model: 'MedicalProfessionals', key: 'id' }
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Roles')
  }
};
