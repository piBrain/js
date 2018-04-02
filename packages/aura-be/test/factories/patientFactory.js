import { factory } from './factory_helper'
import db from '../../src/db/sequelize/models/db_connection'


export const patient = factory.define('patient', db.Patient, {
  firstName: factory.chance('name'),
  lastName: factory.chance('name'),
  email: factory.chance('email'),
  phoneNumber: factory.chance('phone'),
  headshotImgResourceLink: factory.chance('url')
})
