export default () => [
  `type Mutation {
    confirmAddTeamMember( nonce: String! ): JSON
    createTeam( name: String!): JSON
    deactivateTeam( name: String!): JSON
    newsletterSignUp( url: String!, email: String!, firstName: String!, lastName: String!, organization: String ): JSON
    reactivateTeam( name: String!): JSON
    requestAddTeamMember(  url: String!, targetUser: String!, teamName: String! ): JSON
    resetPassword( resetToken: String!, newPassword: String!): JSON
    sendRequest(message: String!, author: String!,  teamName: String!, file: String): JSON
    sendResponse( userTeamId: String!, userRequest: String!, teamName: String!, file: Boolean): JSON
    setConfidenceLevel( messageId: String!): JSON
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
    ): JSON
    updateProfileInfo( info: JSON!): JSON
    uploadToS3( userTeamId: String!, fileName: String!, file: String!, teamName: String!): JSON
    verifyNewsletterEmail( url: String!, email: String!, firstName: String!, lastName: String, timestamp: DateTime!, organization: String! ): JSON
    verifyUserEmail( nonce: String!, url: String! ): JSON
    promoteMemberToAdmin(  targetUser: String!, teamName: String! ): JSON
    toggleApi( apiId: Int! ): JSON
  }`,
]
