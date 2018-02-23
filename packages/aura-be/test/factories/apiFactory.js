import { factory } from './factory_helper'
import db from '../../src/db/sequelize/models/db_connection'
export const api = factory.define('api', db.Api, {
  id: factory.seq('Api.id', (n) => n),
  name: factory.chance('company'),
  active: true,
})

