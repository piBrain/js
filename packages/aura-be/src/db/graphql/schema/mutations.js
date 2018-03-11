export default () => [
  `type Mutation {
    confirmAddTeamMember( nonce: String! ): User
    createTeam( name: String!): Team
    deactivateTeam( name: String!): Boolean
    newsletterSignUp( url: String!, email: String!, firstName: String!, lastName: String!, organization: String ): JSON
    reactivateTeam( name: String!): Team
    requestAddTeamMember(  url: String!, targetUser: String!, teamName: String! ): User
    resetPassword( resetToken: String!, newPassword: String!): JSON
    sendResponse( userTeamId: String!, userRequest: String!, teamName: String!, file: Boolean): JSON
    signUpUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      countryCode: String!,
      url: String,
      gender: String!,
      phoneNumber: String!,
      birthday: Date!,
      password: String!,
      secQuestion1: String!,
      secQuestion2: String!,
      secQuestionResponse1: String!,
      secQuestionResponse2: String!,
    ): User
    updateProfileInfo( info: JSON!): UserProfile
    uploadToS3( userTeamId: String!, fileName: String!, file: String!, teamName: String!): JSON
    verifyNewsletterEmail( url: String!, email: String!, firstName: String!, lastName: String, timestamp: DateTime!, organization: String! ): JSON
    verifyUserEmail( nonce: String!, url: String! ): JSON
    promoteMemberToAdmin(  targetUser: String!, teamName: String! ): User
  }`,
]
