import Mutations from './mutations'
import Queries from './queries'
import Subscriptions from './subscriptions'
import Objects from './objects'
import Interfaces from './interfaces'
import Unions from './unions'
import Enums from './enums'
import resolvers from '../resolvers/combinedResolvers'

import { makeExecutableSchema } from 'graphql-tools'
const baseSchema = () => [ `
  scalar JSON
  scalar DateTime
  scalar Date

  schema {
    query: Query,
    mutation: Mutation,
    subscription: Subscription,
    }
`]

const typeDefs = [
  baseSchema,
  Mutations,
  Queries,
  Subscriptions,
  Objects,
  Interfaces,
  Unions,
  Enums
]

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
