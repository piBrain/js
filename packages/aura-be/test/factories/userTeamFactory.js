import { factory } from './factory_helper'
import db from '../../src/db/sequelize/models/db_connection'

export const userTeam = factory.define('userTeam', db.UserTeam, {
  tag: factory.chance('guid'),
  active: true,
  user_id: factory.assoc('user', 'id'),
  team_id: factory.assoc('team', 'id'),
  type: 'MEMBER'
})


