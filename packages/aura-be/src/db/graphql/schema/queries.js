export default () => [
    `type Query {
      UserProfile: UserProfile
      Teams: [Team]
      Apis: [Api]
      TeamMembers: [User]
      Messages(timeStamp: DateTime!, teamFilter: JSON ): [Message]
      Patients: [Patient]
      Patient(patiendIdentifier: PatientIdentifierInput!): Patient
      MedicalProfessionals: [MedicalProfessional]
      MedicalProfessional(npi: Int!): MedicalProfessional
    }`
]
