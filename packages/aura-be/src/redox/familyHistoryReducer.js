import db from '../db/sequelize/models/db_connection'

export default async (familyHistory, familyHistoryData, patientId) => {
  const transaction = await db.sequelize.transaction()
  const familyHistoryOps = familyHistoryData.map((fh) => {
    const match = familyHistory.filter((famHistory) => {
      return famHistory.get('relationCode') == fh.Relation.Code && famHistory.get('relationCodeSystemName') == fh.Relation.CodeSystemName
    })[0]
    if(match) {
      match.set('relationCode', fh.RelationCode)
      match.set('relationCodeSystemName', fh.RelationCodeSystemName)
      match.set('relationName', fh.RelationName)
      match.set('relationDeceased', fh.RelationDeceased)
      return match.save({transaction})
    } else {
      return db.PatientFamilyHistory.create({
        patientId,
        relationCode: fh.Relation.Code,
        relationCodeSystemName: fh.Relation.CodeSystemName,
        relationName: fh.Relation.Name,
        relationDeceased: fh.Relation.Deceseased,
      }, { transaction })
    }
  })
  return Promise.all(familyHistoryOps).then((res) => {
    return transaction.commit()
  }).catch((err) => {
    transaction.rollback()
    throw new Error(err)
  })
}
