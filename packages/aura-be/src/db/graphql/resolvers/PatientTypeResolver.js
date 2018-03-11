export default {
  Patient: {
    firstName(patient) { return patient.get('firstName') },
    lastName(patient) { return patient.get('lastName') },
    email(patient) { return patient.get('email') },
    phoneNumber(patient) { return patient.get('email') },
    headshotImgResourceLink(patient) { return patient.get('headshotImgResourceLink') },
    identifiers(patient) {
      return db.PatientIdentifier.find({ where: { patientId: patient.get('id') } }) 
    },
    adminInformation(patient) {
      return db.PatientDemographics.findOne({ where: { patientId: patient.get('id') } })
    },
    allergies(patient) {
      return db.PatientAllergy.find({ where: { patientId: patient.get('id') } })
    },
    immunizations(patient) {
      return db.PatientImmunizations.find({ where: { patientId: patient.get('id') } })
    },
    vitals(patient) {
      return db.PatientImmunizations.find({ where: { patientId: patient.get('id') } })
    },
    familyHistory(patient) {
      return db.PatientFamilyHistory.find({ where: { patientId: patient.get('id') } })
    },
    medicalProblems(patient) {
      return db.PatientMedicalProblems.find({ where: { patientId: patient.get('id') } })
    }
  }
}
