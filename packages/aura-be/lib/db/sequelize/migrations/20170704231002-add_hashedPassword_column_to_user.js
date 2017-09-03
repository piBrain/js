'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
    queryInterface.addColumn('Users', 'sign_in_type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'password'
    });
    queryInterface.addColumn('Users', 'in_password_reset', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'password');
    queryInterface.removeColumn('Users', 'sign_in_type');
    queryInterface.removeColumn('Users', 'in_password_reset');
  }
};
//# sourceMappingURL=20170704231002-add_hashedPassword_column_to_user.js.map