import { factory } from './factory_helper'
import db from '../../src/db/sequelize/models/db_connection'

export const session = factory.define('session', db.Session, {
  id: factory.seq('Session.id', (n) => n),
  active: true,
  nonce: factory.seq('Session.nonce', (n) => `ABCDEFABCDEFABCDEF${n}` ),
  password_reset_attempts: 0,
  supplied_reset_email: factory.chance('email'),
  local: false,
  user_id: factory.assoc('user', '_id')
})


