'use strict';
import uuid from 'uuid'

module.exports = function(sequelize, DataTypes) {
  var UserTeam = sequelize.define('UserTeam', {
    tag: { type: DataTypes.UUID, allowNull: false, unique: true},
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationNonce: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, field: 'user_id' },
    teamId: { type: DataTypes.INTEGER, field: 'team_id' },
    type: DataTypes.ENUM('OWNER', 'ADMIN', 'MEMBER', 'GUEST'),
  }, { underscored: true });
  UserTeam.associate = (models) => {
    UserTeam.hasMany(models.Message, { as: 'responses', foreignKey: 'user_team_id', sourceKey: 'tag', scope: {type: 'RESPONSE'}})
    UserTeam.hasMany(models.Message, { as: 'requests', foreignKey: 'user_team_id', sourceKey: 'tag', scope: {type: 'REQUEST'}})
    UserTeam.hasOne(models.Team, {foreignKey: 'id', sourceKey: 'team_id'})
    UserTeam.belongsTo(models.User, {foreignKey: 'user_id', sourceKey: 'id'})
  }
  return UserTeam;
};
