import db from '../../sequelize/models/db_connection'

const queryMedicalProfessionals = async (npi=null) => {
  let users = await db.User.findAll({
    include: [
      { model: db.Role,
        required: true,
        attributes: ['type'],
        include: [ { model: db.MedicalProfessional, required: true } ] }],
        raw: true
  })
  if(npi) {
    users = users.filter((user) => user['Role.MedicalProfessional.npi'] !== npi)
  }
  return users.map((user) => {
    return {
      npi: user['Roles.MedicalProfessional.npi'],
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      active: user.active,
      credentials: user['Roles.MedicalProfessional.credentials'],
      yearsPracticing: user['Roles.MedicalProfessional.years']
    }
  })
}

export const MedicalProfessionals = (obj, args, context) => {
  return queryMedicalProfessionals()
}

export const MedicalProfessional = ( obj, args, context) => {
  const result = queryMedicalProfessionals(args.npi).then((res) => {
    return res[0]
  })
  return result
}
