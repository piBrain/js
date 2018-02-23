const { NODE_ENV } = process.env
import config from '../config'
config()

import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser'
import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import db from './db/sequelize/models/db_connection'
import cors from 'cors'
import crypto from 'crypto'
import base64url from 'base64url'
import { createServer } from 'http'
import schema from './db/graphql/schema/base_schema'
import { execute, subscribe } from 'graphql';
import authHandler from './authHandler'
import login from './login'
import authRedox from './redoxInit'

const backend = express()

backend.use(cors())
backend.use('/login', bodyParser.json(), login)
backend.use(async (req, res, next) => {
    const sessionToken = req.headers
      && req.headers['session-token']
      || undefined
    try {
      const {user, session} = await authHandler(sessionToken)
        .catch((err) => {throw new Error(err)})
      req.session = session
      req.user = user
      next()
    } catch(err) {
      res.sendStatus(401)
        .send(err.text)
        .end()
      return
    }
})
backend.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress((req, res) => {
    return {
      context: {user: req.user, session: req.session},
      schema,
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
const db_sync_result = initDB()

export { backend }
export async function initHttpServer() {
  let db_success = await db_sync_result
  let redoxCredentials = await authRedox()
  console.log(redoxCredentials)
  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
  const server = createServer(backend)
  server.listen(process.env.LISTEN_PORT, () => {
    new SubscriptionServer({
        execute,
        subscribe,
        schema
      }, {
        server,
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
