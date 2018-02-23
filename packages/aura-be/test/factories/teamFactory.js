import { factory } from './factory_helper'
import db from '../../src/db/sequelize/models/db_connection'
export const team = factory.define('team', db.Team, {
  id: factory.seq('Team.id', (n) => n),
  name: factory.chance('company'),
  active: true,
})
