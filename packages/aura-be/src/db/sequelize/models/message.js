'use strict';

const cleanRequestText = (text) => {
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
  text = text.replace(/\s{2,}/g," ")
  return(text.toLowerCase())
}

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    confidence: {
      type: DataTypes.FLOAT,
      defaultValue: 100.0,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('REQUEST', 'RESPONSE'),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(val) {
        if(this.getDataValue('type') == 'REQUEST') {
          this.setDataValue('text', cleanRequestText(val))
        } else {
          this.setDataValue('text', val)
        }
      }
    },
    state: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    userTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_team_id'
    }
  }, { underscored: true });
  Message.associate = (models) => {
    Message.belongsTo(models.UserTeam, { foreignKey: 'user_team_id', targetKey: 'tag'})
  }
  return Message;
};
