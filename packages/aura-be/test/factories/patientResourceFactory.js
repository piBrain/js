import { factory } from './factory_helper'
import db from '../../src/db/sequelize/models/db_connection'

const resourceTypes = ['TRANSCRIPTION', 'LAB_RESULT', 'IMAGING']
export const patientResource = factory.define('patientResource', db.PatientResource, {
  s3Url: factory.chance('url'),
  patientId: factory.assoc('patient', 'id'),
  type: factory.seq('PatientResource.type', (n) => (resourceTypes[n%resourceTypes.length]))
})
