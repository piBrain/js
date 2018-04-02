import db from '../../sequelize/models/db_connection'

export default {
  Patient: {
    firstName(patient) { return patient.get('firstName') },
    lastName(patient) { return patient.get('lastName') },
    email(patient) { return patient.get('email') },
    phoneNumber(patient) { return patient.get('email') },
    headshotImgResourceLink(patient) { return patient.get('headshotImgResourceLink') },
    identifiers(patient) {
      return db.PatientIdentifier.findAll({ where: { patientId: patient.get('id') } })
    },
    adminInformation(patient) {
      return db.PatientDemographics.findOne({ where: { patientId: patient.get('id') } })
    },
    allergies(patient) {
      return db.PatientAllergies.findAll({ where: { patientId: patient.get('id') } })
    },
    immunizations(patient) {
      return db.PatientImmunizations.findAll({ where: { patientId: patient.get('id') } })
    },
    vitals(patient) {
      return db.PatientVitals.findAll({ where: { patientId: patient.get('id') } })
    },
    familyHistory(patient) {
      return db.PatientFamilyHistory.findAll({ where: { patientId: patient.get('id') } })
    },
    medicalProblems(patient) {
      return db.PatientMedicalProblems.findAll({ where: { patientId: patient.get('id') } })
    },
    async resources(patient) {
      return db.PatientResource.findAll({ where: { patientId: patient.get('id') } })
    }
  }
}
