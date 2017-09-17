'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Sessions', 'local', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Sessions', 'local')
  }
};
