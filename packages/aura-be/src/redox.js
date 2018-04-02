import request from 'request-promise-native'
import { createRedoxInsertJob } from './redox/workerQueue'
const requestHandlers = {
  verify: (req, res) => {
    res.send(req.query.challenge)
      .sendStatus(200)
      .end()
    return true
  },
  informationFeed: (req, res) => {
    try { createRedoxInsertJob(req.body) }
    catch(err) {
      console.error(err)
    }
    finally {
      res.sendStatus(200)
      res.end()
    }
  }
}
export const authRedox = async () => {
  const credentials = await request.post(
    process.env.REDOX_URL+'auth/authenticate',
    { form: { apiKey: process.env.REDOX_API_KEY, secret: process.env.REDOX_SECRET } }
  )
  return JSON.parse(credentials)
}

export const redoxHandler = async (req, res) => {
  if(req.headers['verification-token'] !== process.env.REDOX_VERIFICATION) {
   res.sendStatus(401)
      .send('Not authorized.')
      .end()
  }
  if(!req.body) {
    res.sendStatus(400)
    res.end()
  }
  if(req.query.challenge) {
    requestHandlers['verify'](req, res)
  } else {
    requestHandlers['informationFeed'](req, res)
  }
}
