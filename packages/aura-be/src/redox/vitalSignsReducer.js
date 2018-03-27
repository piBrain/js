import db from '../db/sequelize/models/db_connection'

export default async (vitals, vitalsData, patientId) => {
  const transaction = await db.sequelize.transaction()
  const vitalObservations = [].concat(...vitalsData.map((vi) => vi.Observations))
  const vitalsOps = vitalObservations.map((vi) => {
    const match = vitals.filter((vit) => {
      return vit.get('code') == vi.Code && vit.get('codeSystemName') == vi.CodeSystemName
    })[0]
    if(match) {
      match.set('code', vi.Code)
      match.set('codeSystemName', vi.CodeSystemName)
      match.set('name', vi.Name)
      match.set('status', vi.Status)
      match.set('interpretation', vi.Interpretation)
      match.set('dateTimeTaken', vi.DateTime)
      match.set('value', vi.Value)
      match.set('units', vi.Units)
      return match.save({transaction})
    } else {
      return db.PatientVitals.create({
        patientId,
        code: vi.Code,
        codeSystemName: vi.CodeSystemName,
        name: vi.Name,
        status: vi.Status,
        interpretation: vi.Interpretation,
        dateTimeTaken: vi.DateTime,
        value: vi.Value,
        units: vi.Units,
      }, {transaction})
    }
  })
  return Promise.all(vitalsOps).then((res) => {
    return transaction.commit()
  }).catch((err) => {
    transaction.rollback()
    throw new Error(err)
  })
}
