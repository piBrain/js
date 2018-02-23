'use strict';
import uuid from 'uuid'

module.exports = function(sequelize, DataTypes) {
  var UserTeam = sequelize.define('UserTeam', {
    tag: { type: DataTypes.UUID, allowNull: false, unique: true},
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationNonce: { type: DataTypes.STRING },
    UserId: { type: DataTypes.INTEGER, },
    TeamId: { type: DataTypes.INTEGER, },
    type: DataTypes.ENUM('OWNER', 'ADMIN', 'MEMBER', 'GUEST'),
  },);
  UserTeam.associate = (models) => {
    UserTeam.hasMany(models.Message, { as: 'responses', foreignKey: 'userTeamId', sourceKey: 'tag', scope: {type: 'RESPONSE'}})
    UserTeam.hasMany(models.Message, { as: 'requests', foreignKey: 'userTeamId', sourceKey: 'tag', scope: {type: 'REQUEST'}})
    UserTeam.hasMany(models.Message, { as: 'files', foreignKey: 'userTeamId', sourceKey: 'tag', scope: {type: 'FILE'}})
    UserTeam.hasOne(models.Team, {foreignKey: 'id', sourceKey: 'TeamId'})
    UserTeam.belongsTo(models.User, {foreignKey: 'UserId', sourceKey: 'id'})
  }
  return UserTeam;
};
