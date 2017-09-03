'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('Teams', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Teams', 'active');
  }
};
//# sourceMappingURL=20170817210932-add-active-column-teams.js.map