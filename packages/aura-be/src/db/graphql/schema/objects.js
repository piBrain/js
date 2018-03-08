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
  `type MedicalProfessionals implements PersonalInformation {
    id: Int!,
    firstName: String!,
    lastName: String!,
    email: String!,
    active: Boolean!,
    phoneNumber: String!,
    specialty: String!,
    licenses: [String!]
    insurances: [String!]
    hospitalAffilations: [String!],
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
      email: String,
      phoneNumber: String,
  }`,
  `input PatientIdentifier {
      type: PatientIdentifierType,
      identifier: String
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
]
