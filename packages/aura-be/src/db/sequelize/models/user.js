'use strict';
import argon2 from 'argon2'
import { generateSalt } from 'argon2'

module.exports = function(sequelize, DataTypes) {
  const attributes = {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName:{ type: DataTypes.STRING, },
    email:{ type: DataTypes.STRING },
    password: {
      type: DataTypes.STRING,
      validate: {
        isLongEnough: function (val) {
          if(val.length < 16) {
            throw new Error('Password is not long enough. Must be at least 16 characters.')
          }
        },
        isSufficientlyComplex: function (val) {
          var arrayPass = new Array(val)
          let passesSymCheck = arrayPass.some((chr) => {
            return chr.match(/[ !"#\$%&'\(\)\?\*\+\,\-\./\:;\<\=\>?@\[\\\]\^_`\{\|\}~]/)
          })
          let passesNumericCheck = arrayPass.some((chr) => { return chr.match(/\d/) })
          let passesAlphaCheck = arrayPass.some((chr) => { return chr.match(/[a-zA-Z]/)})
          if(!(passesSymCheck && passesNumericCheck && passesAlphaCheck)) { 
            throw new Error('Must have at least 1 of each:  number, letter, and symbol("#$%&\'()*+,-./:;<=>?@[\]^_`{|}~)')
          }
        }
      },
    },
    token:{ type: DataTypes.STRING },
    activationNonce:{ type: DataTypes.STRING, },
    activationExpiry:{ type: DataTypes.DATE, },
    signInType:{ type: DataTypes.ENUM('password', 'google'), },
    active:{ type: DataTypes.BOOLEAN },
    phoneNumber:{ type: DataTypes.STRING, },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  }

  const hashPassword = async (user, options) => {
    if (!user.changed('password')) { return };
    const hash = await argon2.hash(user.password, { type: argon2.argon2i })
    user.setDataValue('password', hash)
  }

  const options = {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  }

  var User = sequelize.define('User', attributes, options);
  User.associate = (models) => {
    User.belongsToMany(models.Team, { through: models.UserTeam })
    User.hasOne(models.UserSecurityInfo, { foreignKey: 'userId', sourceKey: 'id' })
  }

  User.prototype.verifyPassword = async function(suppliedPassword) {
    if(await argon2.verify(this.password, suppliedPassword)) {
      return true
    }
    return false
  }
  return User;
};
