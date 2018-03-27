import db from '../db/sequelize/models/db_connection'

export default async (allergies, allergiesData, patientId) => {
  const transaction = await db.sequelize.transaction()
  const allergyOps = allergiesData.map((allergy) => {
    const match = allergies.filter((al) => {
      return al.get('typeCode') == allergy.Type.Code && al.get('substanceCode') == allergy.Substance.Code
    })[0]
    if(match) {
      match.set('statusCode', allergy.StatusCode)
      match.set('statusCodeSystemName', allergy.StatusCodeSystemName)
      match.set('statusName', allergy.StatusName)
      return match.save({transaction})
    } else {
      return db.PatientAllergies.create({
        patientId,
        typeCode: allergy.Type.Code,
        typeCodeSystemName: allergy.Type.CodeSystemName,
        substanceCode: allergy.Substance.Code,
        substanceCodeSystemName: allergy.Substance.CodeSystemName,
        substanceName: allergy.Substance.Name,
        statusCode: allergy.Status.Code,
        statusCodeSystemName: allergy.Status.CodeSystemName,
        statusName: allergy.Status.Name,
      }, { transaction })
    }
  })
  return Promise.all(allergyOps).then((res) => {
    return transaction.commit()
  }).catch((err) => {
    transaction.rollback()
    throw new Error(err)
  })
}
