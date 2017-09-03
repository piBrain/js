'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('Sessions', 'password_reset_attempts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    queryInterface.addColumn('Sessions', 'last_password_reset_attempt', {
      type: Sequelize.DATE,
      allowNull: true
    });
    queryInterface.addColumn('Sessions', 'supplied_reset_email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Sessions', 'password_reset_attempts');
    queryInterface.removeColumn('Sessions', 'last_password_reset_attempt');
    queryInterface.removeColumn('Sessions', 'supplied_reset_email');
  }
};
//# sourceMappingURL=20170704162802-add_password_reset_meta_to_session.js.map