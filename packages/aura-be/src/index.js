const { NODE_ENV } = process.env
import config from '../config'
config()

import awsServerlessExpress from 'aws-serverless-express'
import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser'
import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import db from './db/sequelize/models/db_connection'
import cors from 'cors'
import GoogleAuth from 'google-auth-library'
import crypto from 'crypto'
import base64url from 'base64url'
import { createServer } from 'http'
import schema from './db/graphql/schema/base_schema'
import { execute, subscribe } from 'graphql';

const qaApp = express()

const authClient = new(new GoogleAuth).OAuth2(process.env.GOOGLE_CLIENT_ID)

const generateNonceString = () => {
  return base64url(crypto.randomBytes(64))
}

qaApp.use(cors())

// graphqlExpress((request) => {
//   const token = request.headers
//     && request.headers.authorization
//     && request.headers.authorization.split(' ')[1]
//     || undefined
//   return {
//     context: { token },
//     schema,
//   }
// }),
//

qaApp.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema })
)


qaApp.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionURL: '/subscriptions'
    }),
)

const db_sync_result = initDB()


export async function initHttpServer() {
  let db_success = await db_sync_result

  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
  const server = createServer(qaApp)
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
