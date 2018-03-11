'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('UserSecurityInfo', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      passwordResetAttempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      lastPasswordResetAttempt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      suppliedResetEmail: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      locked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      resetExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      secQuestion1: {
        type: Sequelize.ENUM,
        values: ['What was the name of your first pet?', 'What was your most rewarding moment in life?', 'What was the name of your first kiss?', 'What celebrity do you most resemble?'],
        allowNull: false,
      },
      secQuestion2: {
        type: Sequelize.ENUM,
        values: ['What was the name of your first pet?', 'What was your most rewarding moment in life?', 'What was the name of your first kiss?', 'What celebrity do you most resemble?'],
        allowNull: false,
      },
      secQuestionResponse1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secQuestionResponse2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      inPasswordReset: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserSecurityInfos');
  }
};
