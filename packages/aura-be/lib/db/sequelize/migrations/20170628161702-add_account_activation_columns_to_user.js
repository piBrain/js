'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        queryInterface.addColumn('Users', 'active', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        });
        queryInterface.addColumn('Users', 'activation_nonce', {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        });
        queryInterface.addColumn('Users', 'activation_expiry', {
            type: Sequelize.DATE,
            allowNull: true
        });
    },

    down: function down(queryInterface, Sequelize) {
        queryInterface.removeColumn('Users', 'active');
        queryInterface.removeColumn('Users', 'activation_nonce');
        queryInterface.removeColumn('Users', 'activation_expiry');
    }
};
//# sourceMappingURL=20170628161702-add_account_activation_columns_to_user.js.map