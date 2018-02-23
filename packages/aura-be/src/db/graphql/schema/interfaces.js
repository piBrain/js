export default () => [
  `interface PersonalInformation {
    id: Int!,
    firstName: String,
    lastName: String,
    email: String,
    active: Boolean,
    phoneNumber: String
  }`,
  `interface UserProfile {
    profileImgResourceLink: String!,
    firstName: String!,
    lastName: String!,
    title: String!,
    teamName: String!,
    role: String!,
  }`
]
