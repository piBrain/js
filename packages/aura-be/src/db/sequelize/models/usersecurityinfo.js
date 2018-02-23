'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserSecurityInfo = sequelize.define('UserSecurityInfo', {
    userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    passwordResetAttempts: { type: DataTypes.INTEGER, allowNull: false, defaultvalue: 0 },
    lastPasswordResetAttempt: { type: DataTypes.DATE, allowNull: true },
    suppliedResetEmail: { type: DataTypes.STRING, allowNull: true },
    locked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    resetToken: { type: DataTypes.STRING, allowNull: true },
    resetExpiry: { type: DataTypes.DATE, allowNull: true },
    secQuestion1:  { type: DataTypes.STRING, allowNull: false },
    secQuestion2: { type: DataTypes.STRING, allowNull: false },
    secQuestionResponse1: { type: DataTypes.STRING, allowNull: false },
    secQuestionResponse2: { type: DataTypes.STRING, allowNull: false },
    inPasswordReset: { type: DataTypes.BOOLEAN, allowNull: false }
  }, {tableName: 'UserSecurityInfo'});
  UserSecurityInfo.associate = (models) => {
  }
  return UserSecurityInfo;
};
