import { factory } from './factory_helper'
import db from '../../src/db/sequelize/models/db_connection'

export const user = factory.define('user', db.User, {
  id: factory.seq('User.id', (n) => n),
  email: factory.seq('User.email', (n) => `user${n}@example.com`),
  token: factory.seq('User.token', (n) => n),
  active: true,
  activationNonce: factory.seq('User.activation_nonce', (n) => `${n}abcdefabcdef`),
  phoneNumber: factory.chance('phone'),
  password: factory.seq('User.password', (n) => `${n}ABCDEFABCDEFABCDEFA@!`)

})


