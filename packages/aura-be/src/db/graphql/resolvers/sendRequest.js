import db from '../../sequelize/models/db_connection'
import AuraGqlClient from 'aura-gql'
import * as schema from '../schema/base_schema'
import gql from 'graphql-tag'


const setConfidenceLevel = gql`
  mutation setConfidence($nonce: String!, $messageId: String!) {
    setConfidenceLevel(nonce: $nonce, messageId: $messageId) { res }
  }
`

const executeSendRequest = async ({ nonce, teamName, message, state } = { state: null }) => {
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
    const request = await db.Message.create({text: message, state: state, type: 'REQUEST', userTeamId: team.UserTeam.get('tag')})
    const res = await localGqlClient.mutate({ mutation: setConfidenceLevel, variables: { nonce: nonce, messageId: request.get('id') } })
    const confidence = res.data.setConfidenceLevel.data
    console.log(res)
    await team.UserTeam.addRequest(request)
    await team.UserTeam.save()
    return { err: false, response: `Sure, let me handle that for you.`, data: confidence }
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

