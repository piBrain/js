import expect from 'expect'
import * as graphql from 'graphql'
import { createLocalInterface } from 'apollo-local-query'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

class AuraGqlClient extends ApolloClient {
  constructor({ options, schema, uri }) {
    expect(schema || uri, 'AuraGqlClient requires either a uri or grqphql schema')
    const isLocalClient = schema && !uri
    let networkInterface

    if (isLocalClient) {
      networkInterface = createLocalInterface(graphql, schema)
    } else {
      networkInterface = createNetworkInterface({ uri })
    }

    options = { ...options, networkInterface }

    super(options)
  }
}



export default AuraGqlClient
