import Umzug from 'umzug'
import path from 'path'
import config from '../config'
import chai from 'chai'
import chaiHttp from 'chai-http'
import db from '../src/db/sequelize/models/db_connection'
import FactoryGirl from 'factory-girl'
import { beforeEach, afterEach } from 'mocha'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch';
import factories from './factories/db-factories'
config()
const makeClient = (headers) => {
  const httpLink = new HttpLink({ uri: 'http://localhost:7327/graphql', fetch, headers })
  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) console.error(`[Network error]: ${networkError}`);
  })
  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

const dbConfig = {
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 10,
    idle: 10000,
    acquire: 200000
  },
  retry: {
    max: 0,
  }
}
export const testDB = db
testDB.sequelize.options.logging = false

const chaiSetUp = () => {
  chai.use(chaiHttp)
  return chai
}
const startUp = async () => {
  try {
    await testDB.sequelize.truncate({cascade: true})
  } catch(err) {
    console.error(err.trace)
    throw err
  }
}

const makeAndAuthUser = async () => {
  const session = await factories.create('session')
  return { user: session.getUser(), session }
}


export const prepareTestEnvironment = () => {
    beforeEach(startUp)
    return {
      chai: chaiSetUp(),
      makeApolloClient: makeClient,
      makeAndAuthUser
    }
}

