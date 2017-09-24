'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Messages', 'confidence', {
      type: Sequelize.FLOAT,
      defaultValue: 100.0,
      allowNull: false
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Messages', 'confidence')
  }
};
