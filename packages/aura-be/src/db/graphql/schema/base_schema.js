import Mutations from './mutations'
import Queries from './queries'
import resolvers from '../resolvers/combinedResolvers'
import { makeExecutableSchema } from 'graphql-tools'
const baseSchema = () => [ `
  scalar JSON
  scalar DateTime

  schema {
    query: Query,
    mutation: Mutation, }
`]

const typeDefs = [
  baseSchema,
  Mutations,
  Queries,
]

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
