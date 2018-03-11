import db from '../../sequelize/models/db_connection'

export const Patients = async (obj, args, context) => {
  return await db.Patient.findAll()
}

export const Patient = async (obj, args, context) => {
  const patientId = await db.PatientIdenfier.findOne({where: { type: args.PatientIdentifer.type, identifier: args.PatientIdentifier.identifier }})
  return await db.Patient.findOne({where: { id: patientId.get('patientId') }})
}
