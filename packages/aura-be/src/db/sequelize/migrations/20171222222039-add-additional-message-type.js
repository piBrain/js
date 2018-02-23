'use strict';
const replaceEnum = ({
  tableName,
  columnName,
  defaultValue,
  newValues,
  queryInterface,
  enumName = `enum_${tableName}_${columnName}`
}) => {
  const newEnumName = `${enumName}_new`;

  return queryInterface.sequelize.transaction((t) => {
    // Create a copy of the type
    return queryInterface.sequelize.query(`
      CREATE TYPE "${newEnumName}"
        AS ENUM ('${newValues.join('\', \'')}')
    `, { transaction: t })
      // Drop default value (ALTER COLUMN cannot cast default values)
      .then(() => queryInterface.sequelize.query(`
        ALTER TABLE "${tableName}"
          ALTER COLUMN ${columnName}
            DROP DEFAULT
      `, { transaction: t }))
      // Change column type to the new ENUM TYPE
      .then(() => queryInterface.sequelize.query(`
        ALTER TABLE "${tableName}"
          ALTER COLUMN ${columnName}
            TYPE "${newEnumName}"
            USING (${columnName}::text::"${newEnumName}")
      `, { transaction: t }))
      // Drop old ENUM
      .then(() => queryInterface.sequelize.query(`
        DROP TYPE "${enumName}"
      `, { transaction: t }))
      // Rename new ENUM name
      .then(() => queryInterface.sequelize.query(`
        ALTER TYPE "${newEnumName}"
          RENAME TO "${enumName}"
      `, { transaction: t }))
      .then(() => queryInterface.sequelize.query(`
        ALTER TABLE "${tableName}"
          ALTER COLUMN ${columnName}
            SET DEFAULT '${defaultValue}'::"${enumName}"
      `, { transaction: t }));
  });
}
module.exports = {
  up: function (queryInterface, Sequelize) {
    replaceEnum(
      {
        tableName: 'Messages',
        columnName: 'type',
        defaultValue: 'REQUEST',
        newValues: ['REQUEST', 'RESPONSE', 'FILE'],
        queryInterface
      }
    )
    queryInterface.addColumn('Messages', 's3Path', {
        type: Sequelize.STRING,
        allowNull: true
    })
  },

  down: function (queryInterface, Sequelize) {
    replaceEnum(
      {
        tableName: 'Messages',
        columnName: 'type',
        enumName: 'enum_Messages_type',
        defaultValue: 'REQUEST',
        newValues: ['REQUEST', 'RESPONSE'],
        queryInterface
      }
    )
    queryInterface.removeColumn('Messages', 's3Path')
  }
};
