export default () => [
    `type Query {
      returnProfileInfo: JSON
      Teams: [Team]
      Apis: [Api]
      TeamMembers: [User]
      Messages(timeStamp: DateTime!, teamFilter: JSON ): [Message]
    }`
]
