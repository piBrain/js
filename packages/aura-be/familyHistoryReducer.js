import db from ../db/sequelize/models/db_connection.js

export default (familyHistory, familyHistoryData, patientId) => {
  familyHistoryData.map((fh) => {
    const match = fh.filter((famHistory) => {
      return famHistory.get('relationCode') == fh.TypeCode && famHistory.get('relationCodeSystemName') == fh.SubstanceCode
    })[0]
    if(match) {
      match.set('relationCode', .StatusCode)
      match.set('statusCodeSystemName', allergy.StatusCodeSystemName)
      match.set('statusName', allergy.StatusName)
    } else {
      await db.PatientAllergies.create({
        patientId,
        typeCode: allergy.TypeCode,
        typeCodeSystemName: allergy.TypeCodeSystemName,
        substanceCode: allergy.SubstanceCode,
        substanceCodeSystemName: allergy.SubstanceCodeSystemName,
        substanceName: allergy.SubstanceName,
        statusCode: allergy.StatusCode,
        statusCodeSystemName: allergy.StatusCodeSystemName,
        statusName: allergy.StatusName:
      })
    }
  })
}
