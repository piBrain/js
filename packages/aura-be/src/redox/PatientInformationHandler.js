import db from '../db/sequelize/models/db_connection'
import allergiesReducer from './allergiesReducer'
import immunizationsReducer from './immunizationsReducer'
import familyHistoryReducer from './familyHistoryReducer'
import vitalSignsReducer from './vitalSignsReducer'
import medicalProblemsReducer from './medicalProblemsReducer'

const identifierReducer = async (identifiersData) => {
  const idValues = identifiersData.map((id) => id.ID)
  const identifiers = await db.PatientIdentifier.findAll({ where: { identifier: idValues } })
  const identifierValues = identifiers.map((id) => id.get('identifier'))
  const newIds = identifiersData.filter((id) => !identifierValues.includes(id.ID))
  let patient = null
  const transaction  = await db.sequelize.transaction()
  if(identifiers.length > 0) {
    patient = identifiers[0].getPatient()
  } else {
    patient = await db.Patient.create({}, { transaction })
  }
  const results = newIds.map((id) => {
    return db.PatientIdentifier.create({
      type: id.IDType, identifier: id.ID, patientId: patient.get('id')
    }, { transaction })
  })
  return Promise.all(results).then((res) => {
    transaction.commit()
    return patient
  }).catch((err) => {
    transaction.rollback()
    throw new Error(err)
  })
}

const demographicsReducer = (demographics, demographicsData, patientId) => {
  const demoInfo = {
      firstName: demographicsData.FirstName,
      lastName: demographicsData.LastName,
      dob: demographicsData.DOB,
      sex: demographicsData.Sex,
      race: demographicsData.Race,
      isDeceased: demographicsData.IsDeceased,
      homePhone: demographicsData.PhoneNumber.Home,
      officePhone: demographicsData.PhoneNumber.Office,
      mobilePhone: demographicsData.PhoneNumber.Mobile,
      email: parseEmail(demographicsData.EmailAddresses[0]),
      patientId
    }
  if(!demographics) {
    return db.PatientDemographics.create(demoInfo)
  }
  demographics.set(demoInfo)
  return demographics.save()
}

const reducers = {
  Allergies: [allergiesReducer, 'PatientAllergies'],
  Immunizations: [immunizationsReducer, 'PatientImmunizations'],
  FamilyHistory: [familyHistoryReducer, 'PatientFamilyHistory'],
  Problems: [medicalProblemsReducer, 'PatientMedicalProblems'],
  VitalSigns: [vitalSignsReducer, 'PatientVitals'],
}

const parseEmail = (email) => {
  if(typeof email === 'object') {
    return email['address']
  }
  return email
}

export default async (data) => {
  const patientData = data.Patient || data.Header.Patient
  if(!patientData) {
    throw new Error('No patient data.')
  }
  const demographicsData = patientData.Demographics
  const patient = await identifierReducer(patientData.Identifiers)
  const transaction = db.sequelize.transaction()
  patient.set({
    email: parseEmail(demographicsData.EmailAddresses[0]),
    firstName: demographicsData.FirstName,
    lastName: demographicsData.LastName,
    phoneNumber: demographicsData.PhoneNumber.Mobile,
  })
  await patient.save({ transaction })
  const demographics = await db.PatientDemographics.findOne({where: { patientId: patient.get('id') }})
  demographicsReducer(demographics, demographicsData, patient.get('id'))
  try {
    for(let sectionHeader of Object.keys(reducers)) {
      if(data[sectionHeader]) {
        // Grab the appropriate data and reducer for the particular section of data we want to injest
        const existingData = await db[reducers[sectionHeader][1]].findAll({ where: { patientId: patient.get('id') } })
        reducers[sectionHeader][0](existingData, data[sectionHeader], patient.get('id'))
      }
    }
  }
  catch(err) {
    throw new Error(err)
  }
}


