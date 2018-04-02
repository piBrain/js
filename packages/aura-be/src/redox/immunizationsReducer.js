import db from '../db/sequelize/models/db_connection'

export default async (immunizations, immunizationsData, patientId) => {
  const transaction = await db.sequelize.transaction()
  const immunizationOps = immunizationsData.map((immun) => {
    const match = immunizations.filter((imm) => {
      return imm.get('dateTime') == immun.DateTime && imm.get('productCode') == immun.Product.Code
    })[0]
    if(match) {
      match.set('dateTime', immun.DateTime)
      match.set('routeName', immun.Route.Name)
      match.set('productManufacturer', immun.Product.Manufacturer)
      match.set('productCodeSystemName', immun.Product.CodeSystemName)
      match.set('productCode', immun.Product.Code)
      match.set('productName', immun.Product.Name)
      match.set('productLotNumber', immun.Product.LotNumber)
      match.set('doseQuantity', immun.Dose.Quantity)
      match.set('doseUnits', immun.Dose.Units)
      match.set('patientId', patientId)
      return match.save({transaction})
    } else {
      console.log(immun.Product.Code)
      return db.PatientImmunizations.create({
        dateTime: immun.DateTime,
        routeName: immun.Route.Name,
        productCode: immun.Product.Code,
        productName: immun.Product.Name,
        productManufacturer: immun.Product.Manufacturer,
        productCodeSystemName: immun.Product.CodeSystemName,
        doseQuantity: immun.Dose.Quantity,
        doseUnits: immun.Dose.Units,
        patientId: patientId,
      }, {transaction})
    }
  })
  return Promise.all(immunizationOps).then((res) => {
    return transaction.commit()
  }).catch((err) => {
    transaction.rollback()
    throw new Error(err)
  })
}
