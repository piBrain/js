import { factory } from './factory_helper'
import db from '../../src/db/sequelize/models/db_connection'

export const user = factory.define('user', db.User, {
  id: factory.seq('User.id', (n) => n),
  email: factory.seq('User.email', (n) => `user${n}@example.com`),
  token: factory.seq('User.token', (n) => n),
  active: true,
  activation_nonce: factory.seq('User.activation_nonce', (n) => `${n}abcdefabcdef`),
  phoneNumber: factory.chance('phone'),
  sec_question_1: 'What was the name of your first pet?',
  sec_question_2: 'What was your most rewarding moment in life?',
  sec_question_response_1: factory.chance('sentence'),
  sec_question_response_2: factory.chance('sentence'),
  password: factory.seq('User.password', (n) => `${n}ABCDEFABCDEFABCDEFA@!`)

})


