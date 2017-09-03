'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'locked', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
    queryInterface.addColumn('Users', 'reset_token', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
    queryInterface.addColumn('Users', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: false
    });
    queryInterface.addColumn('Users', 'reset_expiry', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'locked');
    queryInterface.removeColumn('Users', 'reset_token');
    queryInterface.removeColumn('Users', 'phone_number');
    queryInterface.removeColumn('Users', 'reset_expiry');
  }
};
//# sourceMappingURL=20170704162817-add_password_reset_meta_to_user.js.map