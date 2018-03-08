export default () => [
    `type Query {
      UserProfile: UserProfile
      Teams: [Team]
      Apis: [Api]
      TeamMembers: [User]
      Messages(timeStamp: DateTime!, teamFilter: JSON ): [Message]
      PatientAdminInformation(patientIdentifier: PatientIdentifier!): PatientAdminInformation
    }`
]
