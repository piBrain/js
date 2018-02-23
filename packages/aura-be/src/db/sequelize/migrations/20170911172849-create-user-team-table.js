'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('UserTeams', {
      tag: { type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4, unique: true},
      active: { type: Sequelize.BOOLEAN, defaultValue: false },
      activationNonce: { type: Sequelize.STRING, unique: true },
      UserId: { type: Sequelize.INTEGER },
      TeamId: { type: Sequelize.INTEGER },
      type: { type: Sequelize.ENUM, values: ['OWNER', 'ADMIN', 'MEMBER', 'GUEST'], allowNull: false },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserTeams');
  }
};
