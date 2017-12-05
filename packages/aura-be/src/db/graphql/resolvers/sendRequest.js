import db from '../../sequelize/models/db_connection'
import AuraGqlClient from 'aura-gql'
import * as schema from '../schema/base_schema'
import gql from 'graphql-tag'
import pubsub from '../subscriptionClient'

const setConfidenceLevel = gql`
  mutation setConfidence($nonce: String!, $messageId: String!) {
    setConfidenceLevel(nonce: $nonce, messageId: $messageId) { res }
  }
`

const sendResponse = gql`
  mutation response($nonce: String!, $userTeamId: String!, $userRequest: String!, $teamName: String!) {
    sendResponse(nonce: $nonce, userRequest: $userRequest, userTeamId: $userTeamId, teamName: $teamName) { res }
  }
`

// const fb_host = 'https://graph.facebook.com/v2.11/'
// const access_token = 'EAAK4SQw0Um8BACuZA9RlVCzXALZA5xwunKsyLM1LOw1BahhP7VeKhYNedZAaVO6IPZBCNuB3GpRjt2IKBlZCqad5K9u6Uv47fPkr6VnGlkoVgD5uIySiUZBZBZA4tlh5C38GpZCgwjaLeZA1zuWulAxnqeVW0rPdTGuj0O3rscCldBxyJcllsn5Qel'
// let user_id = await request.get(`${fb_host}me?access_token=${access_token}`).json()
// user_id = user_id['id']

const executeSendRequest = async ({ nonce, message, teamName, author }) => {
  const localGqlClient = new AuraGqlClient({ options: {}, schema: schema['default'] })
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    let user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const teams = await user.getTeams()
    const team = teams.filter((team) => (team.name === teamName))[0]
    if(!team) { return { err: true, response: 'You are not a member of that team.' } }
    if(!team.active) { return { err: true, response: 'Team not active! Cannot send request.' } }
    const request = await db.Message.create({text: message, type: 'REQUEST', userTeamId: team.UserTeam.get('tag')})
    const res = await localGqlClient.mutate({ mutation: setConfidenceLevel, variables: { nonce: nonce, messageId: request.get('id') } })
    const confidence = res.data.setConfidenceLevel.data
    await team.UserTeam.addRequest(request)
    await team.UserTeam.save()
    try {
      localGqlClient.mutate({mutation: sendResponse, variables: { nonce, userTeamId: team.UserTeam.get('tag'), userRequest: message, teamName  }})
    } catch(err) {
      console.error(err)
    }
    await pubsub.publish(
      'messages',
      { messages: [{ message, type: 'NEW_REQUEST', confidence, author, team, timestamp: request.get('created_at') }]}
    )
    return { err: false, data: { success: true } }
  } catch(err) {
    console.error(err)
    await pubsub.publish(
      'messages',
      { messages: [{ message: 'Sorry, something is wrong I didn\'t get your request.', type: 'FAILED_REQUEST', author: 'Aura', team, timestamp: (new Date()).toISOString() }]}
  )
    return { err: false, data: { success: false } }
  }
}

const sendRequest = (_, args, context) => {
  console.log('sendRequest')
  return executeSendRequest(args)
}

export default sendRequest

