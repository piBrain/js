'use strict';
import replaceEnum from 'sequelize-replace-enum-postgres'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return replaceEnum({
      queryInterface,
      tableName: 'PatientIdentifiers',
      columnName: 'type',
      defaultValue: 'MR',
      newValues: ['MR', 'EHRID', 'NIST'],
      enumName: 'enum_PatientIdentifiers_type'
    })
  },

  down: function (queryInterface, Sequelize) {
    return replaceEnum({
      queryInterface,
      tableName: 'PatientIdentifiers',
      columnName: 'type',
      defaultValue: 'MR',
      newValues: ['MR',],
      enumName: 'enum_PatientIdentifiers_type'
    })
  }
};
