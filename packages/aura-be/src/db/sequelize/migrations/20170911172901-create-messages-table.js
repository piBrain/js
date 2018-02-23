'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['REQUEST','RESPONSE'],
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      state: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userTeamId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'UserTeams', key: 'tag' }
      }
    })

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Messages')
  }
};
