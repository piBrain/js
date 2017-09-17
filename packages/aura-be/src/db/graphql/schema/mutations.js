export default () => [
  `type Mutation {
    confirmAddTeamMember( nonce: String! ): JSON
    createTeam(nonce: String!, name: String!): JSON
    deactivateTeam(nonce: String!, name: String!): JSON
    forgotPassword(nonce: String!, secQuestionResponse1: String!, secQuestionResponse2: String!): JSON
    newsletterSignUp( url: String!, email: String!, firstName: String!, lastName: String!, organization: String ): JSON
    reactivateTeam(nonce: String!, name: String!): JSON
    requestAddTeamMember( nonce: String!, url: String!, targetUser: String!, teamName: String! ): JSON
    resetPassword(nonce: String!, resetToken: String!, newPassword: String!): JSON
    sendRequest(nonce: String!, teamName: String!, message: String!, state: JSON!): JSON
    sendResponse(nonce: String!, userTeamId: String!, message: String!): JSON
    setConfidenceLevel(nonce: String!, messageId: String!): JSON
    signUpUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      countryCode: String!,
      url: String!,
      title: String,
      company: String,
      phoneNumber: String!,
      password: String!,
      secQuestion1: String!,
      secQuestion2: String!,
      secQuestionResponse1: String!,
      secQuestionResponse2: String!,
    ): JSON
    updateProfileInfo(nonce: String!, info: JSON!): JSON
    verifyNewsletterEmail( url: String!, email: String!, firstName: String!, lastName: String, timestamp: DateTime!, organization: String! ): JSON
    verifyUserEmail( nonce: String!, url: String! ): JSON
    promoteMemberToAdmin( nonce: String!, targetUser: String!, teamName: String! ): JSON
  }`,
]
