const { NODE_ENV } = process.env
import config from '../config'
config()

import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser'
import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { ApolloEngine } from 'apollo-engine'
import db from './db/sequelize/models/db_connection'
import cors from 'cors'
import crypto from 'crypto'
import base64url from 'base64url'
import { createServer } from 'http'
import schema from './db/graphql/schema/base_schema'
import { execute, subscribe } from 'graphql';
import authHandler from './authHandler'
import login from './login'
import {authRedox, redoxHandler} from './redox'
import kue  from 'kue'
let redoxCredentials = null
if(!process.env.NODE_ENV === 'test') {
  redoxCredentials = authRedox()
    .then(resp => (resp))
    .catch(e => {
        throw new Error('Redox unreachable.')
    })
} else {
  redoxCredentials = {}
}
const backend = express()
backend.use(cors())
backend.post('/redox', bodyParser.json(), redoxHandler)
backend.get('/redox', bodyParser.json(), redoxHandler)
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
  backend.use('/queue', kue.app)
}
backend.post('/login', bodyParser.json(), login)
backend.use(async (req, res, next) => {
  const sessionToken = req.headers
    && req.headers['session-token']
    || undefined
  try {
    const {user, session} = await authHandler(sessionToken)
      .catch(err => {throw new Error(err)})
    req.session = session
    req.user = user
    next()
  } catch(err) {
    err.status = 401
    next(err)
  }
})
backend.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress((req, res) => {
    return {
      context: {user: req.user, session: req.session, redoxCredentials},
      schema,
      tracing: true,
      cacheControl: true
    }
  })
)

backend.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionURL: '/subscriptions'
    }),
)

backend.use((err, req, res, next) => {
  console.error(err.trace)
  if(err.status) {
    res.status(err.status)
       .send(JSON.stringify(err))
       .end()
  } else {
    res.status(500)
       .send(JSON.stringify('Internal server error.'))
       .end()
  }
  return
})
const db_sync_result = initDB()

export { backend }
export async function initHttpServer() {
  let db_success = await db_sync_result
  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
  let server = null
  if(process.env.NODE_ENV == 'test') {
    server = createServer(backend)
  } else {
    server = new ApolloEngine({
      apiKey: process.env.APOLLO_ENGINE_API_KEY
    })
  }
  server.listen({port: process.env.LISTEN_PORT, expressApp: backend}, () => {
    new SubscriptionServer({
        execute,
        subscribe,
        schema
      }, {
        server: server,
        path: '/subscriptions',
      });
  })
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      console.log(`DataQA API now listening on port ${process.env.LISTEN_PORT}`)
      resolve(server)
    })
    server.on('error', err => reject(err))
  })
}

export function initDB() {
  console.log('Initializing DB.')
  return db.sequelize.sync()
    .then(() => (console.log('db initialized')))
}
