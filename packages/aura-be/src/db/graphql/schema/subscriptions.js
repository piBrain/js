
export default () => [
    `type Subscription {
      teams( nonce: String! ): JSON
      messages( nonce: String! ): JSON
    }`
  ]
