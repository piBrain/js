'use strict';
const roleAttributes = {
  medicalProfessional: [''],
  administrator: [''],
  adiminstrativeStaff: ['']
}

const validateRoleAttributes = (role, options) => {
  if(!Object.keys(roleAttributes).include(role.type))  {
    throw new Error('Role type does not exist.')
  }
  const allowedAttributes = Object.keys(role.get('attributes'))
  .filter((key) => roleAttributes[role.get('type')].includes(key))
  .reduce((obj,key) => {
    obj[key] = role.get('attributes')[key]
  }, {})
  role.set('attributes', allowedAttributes)
}


module.exports = function(sequelize, DataTypes) {
  const options = {
    hooks: {
      beforeCreate: validateRoleAttributes,
      beforeUpdate: validateRoleAttributes
    }
  }
  var Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: { type: DataTypes.ENUM(['medicalProfessional, administrator, administrativeStaff']) },
    userId: { type: DataTypes.INTEGER},
    roleAttributes: {type: DataTypes.JSONB},
    medicalProfessionalId: { type: DataTypes.INTEGER }
  }, );
  Role.associate = (models) => {
    Role.belongsTo(models.MedicalProfessional, { sourceKey: 'medicalProfessionalId' })
  }
  return Role;
};


