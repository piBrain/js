import db from '../../sequelize/models/db_connection'
import AuraGqlClient from 'aura-gql'
import * as schema from '../schema/base_schema'
import gql from 'graphql-tag'
import request from 'request-promise-native'

const setConfidenceLevel = gql`
  mutation setConfidence($nonce: String!, $messageId: String!) {
    setConfidenceLevel(nonce: $nonce, messageId: $messageId) { res }
  }
`

const executeSendRequest = async ({ message, author }) => {
  // const localGqlClient = new AuraGqlClient({ options: {}, schema: schema['default'] })
  try {
    // let session =  await db.Session.findOne({ where: { nonce } })
    // if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    // let user = await session.getUser()
    // if(!user) { return { err: true, response: 'Whoops! Something went wrong.' } }
    // const teams = await user.getTeams()
    // const team = teams.filter((team) => (team.name === teamName))[0]
    // if(!team) { return { err: true, response: 'You are not a member of that team.' } }
    // if(!team.active) { return { err: true, response: 'Team not active! Cannot send request.' } }
    // const request = await db.Message.create({text: message, state: state, type: 'REQUEST', userTeamId: team.UserTeam.get('tag')})
    // const res = await localGqlClient.mutate({ mutation: setConfidenceLevel, variables: { nonce: nonce, messageId: request.get('id') } })
    // const confidence = res.data.setConfidenceLevel.data
    // console.log(res)
    // await team.UserTeam.addRequest(request)
    // await team.UserTeam.save()
    //
    const fb_host = 'https://graph.facebook.com/v2.11/'
    const access_token = 'EAAK4SQw0Um8BACuZA9RlVCzXALZA5xwunKsyLM1LOw1BahhP7VeKhYNedZAaVO6IPZBCNuB3GpRjt2IKBlZCqad5K9u6Uv47fPkr6VnGlkoVgD5uIySiUZBZBZA4tlh5C38GpZCgwjaLeZA1zuWulAxnqeVW0rPdTGuj0O3rscCldBxyJcllsn5Qel'
    let user_id = await request.get(`${fb_host}me?access_token=${access_token}`).json()
    user_id = user_id['id']
    let response = await request.post('http://dev.pibrain.ngrok.io/predict', { form : {sentence: message} })
    response = JSON.parse(response)
    const request_method = response[0]
    let fb_response = null
    let request_body = response.slice(1, response.length)
    for(let x in request_body) {
      if(request_body[x] == 'userid') {
        request_body[x] = user_id
      }
    }
    request_body.pop()
    if(request_body[0] == 'graph' && request_body[1] == 'facebook') {
      request_body = request_body.slice(2, request_body.length)
      if(request_method == 'get') {
        fb_response = await request.get(`${fb_host}${request_body.join('/')}?access_token=${access_token}`)
        console.log(fb_response)
      }
    }
    if(fb_response) {
      return { err: false, response: 'Sure, let me handle that for you.', data: fb_response }
    }
    return { err: false, response: `Sure, let me handle that for you.`, data: response.join(' ') }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const sendRequest = (_, args, context) => {
  console.log('sendRequest')
  return executeSendRequest(args)
}

export default sendRequest

