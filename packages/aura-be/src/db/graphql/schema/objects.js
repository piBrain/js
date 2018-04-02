export default () => [
  `type Api {
      id: Int!,
      name: String,
      active: Boolean
   }`,
  `type Team {
      id: Int!,
      name: String,
      active: Boolean,
      users: [User]
      activeApis: [Api]
  }`,
  `type Message {
    id: Int!,
    message: String!,
    timestamp: DateTime!,
    confidence: Int,
    author: User,
    team: Team
  }`,
  `type MedicalProfessional implements PersonalInformation {
    npi: Int!,
    firstName: String!,
    lastName: String!,
    email: String!,
    active: Boolean!,
    phoneNumber: String!,
    credentials: [String!]
    yearsPracticing: Int!
  }`,
  `type UserProfile {
    profileImgResourceLink: String!,
    title: String!,
    teamName: String!,
    role: String!,
  }`,
  `type Patient {
      firstName: String,
      lastName: String,
      email: String!,
      phoneNumber: String,
      headshotImgResourceLink: String,
      identifiers: [PatientIdentifier],
      adminInformation: PatientAdminInformation,
      allergies: [PatientAllergy],
      immunizations: [PatientImmunization],
      vitals: [PatientVitals],
      familyHistory: [PatientFamilyHistory],
      medicalProblems: [PatientMedicalProblem]
      resources: [PatientResource]

  }`,

  `input PatientIdentifierInput {
      type: PatientIdentifierType!,
      identifier: String!
  }`,
  `type PatientIdentifier {
      type: PatientIdentifierType!,
      identifier: String!
  }`,
  `type PatientAdminInformation {
      firstName: String,
      lastName: String,
      dob: DateTime,
      sex: PatientSex,
      race: String,
      isDeceased: Boolean,
      homePhone: String,
      officePhone: String,
      mobilePhone: String,
      email: String,
      address: String
  }`,
  `type PatientAllergy {
      type: String!,
      typeCode: String,
      typeCodeSystemName: String,
      substance: String!,
      substanceCode: String,
      substanceCodeSystemName: String,
      status: String,
      statusCode: String,
      statusCodeSystemName: String
  }`,
  `type PatientImmunization {
    dateTime: DateTime!,
    route: String!,
    product: String!,
    productManufacturer: String,
    productLotNumber: String,
    doseQuantity: String,
    doseUnits: String,
    productCode: String,
    productCodeSystemName: String,
  }`,
  `type PatientVitals {
    name: String!,
    status: String!,
    dateTimeTaken: DateTime!,
    interpretation: String,
    value: String,
    units: String,
    code: String!,
    codeSystemName: String!
  }`,
  `type PatientFamilyHistory {
    relationName: String!,
    relationDeceased: String!,
  }`,
  `type PatientMedicalProblem {
    startDate: DateTime!,
    endDate: DateTime!,
    status: String!,
    name: String!,
    code: String,
    codeSystemName: String,
    category: String,
    categorySystemName: String,
    healthStatus: String,
  }`,
  `type PatientResource {
    s3Url: String!,
    type: String!,
  }`
]
