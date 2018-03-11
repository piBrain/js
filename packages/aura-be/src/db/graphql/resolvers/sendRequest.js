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
  mutation response($nonce: String!, $userTeamId: String!, $userRequest: String!, $teamName: String!, $file: Boolean) {
    sendResponse(nonce: $nonce, userRequest: $userRequest, userTeamId: $userTeamId, teamName: $teamName, file: $file) { res }
  }
`

const uploadToS3 = gql`
  mutation uploadToS3($nonce: String!, $userTeamId: String!, $fileName: String!, $file: String!, $teamName: String!) {
    uploadToS3(nonce: $nonce, userTeamId: $userTeamId, teamName: $teamName, fileName: $fileName, file: $file)
  }
`
// const fb_host = 'https://graph.facebook.com/v2.11/'
// const access_token = 'EAAK4SQw0Um8BACuZA9RlVCzXALZA5xwunKsyLM1LOw1BahhP7VeKhYNedZAaVO6IPZBCNuB3GpRjt2IKBlZCqad5K9u6Uv47fPkr6VnGlkoVgD5uIySiUZBZBZA4tlh5C38GpZCgwjaLeZA1zuWulAxnqeVW0rPdTGuj0O3rscCldBxyJcllsn5Qel'
// let user_id = await request.get(`${fb_host}me?access_token=${access_token}`).json()
// user_id = user_id['id']
const createRequest = async ({nonce, message, teamName, author, team, client}) => {
  const request = await db.Message.create({
    text: message,
    type: 'REQUEST',
    userTeamId: team.UserTeam.get('tag')
  })
  const res = await client.mutate({
    mutation: setConfidenceLevel,
    variables: {
      nonce: nonce,
      messageId: request.get('id')
    }
  })
  const confidence = res.data.setConfidenceLevel.data
  await team.UserTeam.addRequest(request)
  await team.UserTeam.save()
  client.mutate({
    mutation: sendResponse,
    variables: {
      nonce,
      userTeamId: team.UserTeam.get('tag'),
      userRequest: message,
      teamName
    }
  })
  await pubsub.publish(
    'messages',
    {
      messages: [
        {
          message,
          type: 'NEW_REQUEST',
          confidence,
          author,
          team,
          timestamp: request.get('created_at')
        }
      ]
    }
  )
}

const createFile = async (nonce, message, teamName, author, file, team, client) => {
  const s3Path = await client.mutate({
    mutation: uploadToS3,
    variables: {
      nonce,
      userTeamId: team.UserTeam.get('tag'),
      fileName: message,
      file,
      teamName
    }
  })
  const upload = await db.Message.create({
    text: message,
    type: 'FILE',
    userTeamId: team.UserTeam.get('tag'),
    s3Path: s3Path.data.path
  })
  await team.UserTeam.addFile(upload)
  await team.UserTeam.save()
  client.mutate({
    mutation: sendResponse,
    variables: {
      nonce,
      userTeamId: team.UserTeam.get('tag'),
      userRequest: message,
      teamName,
      file: true
    }
  })
  await pubsub.publish(
    'messages',
    {
      messages: [
        {
          message: message,
          type: 'FILE_UPLOAD',
          confidence: 100,
          author,
          team,
          timestamp: upload.get('created_at')
        }
      ]
    }
  )
}
const executeSendRequest = async ({ nonce, message, teamName, author, file=null }) => {
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
    if(!file) {
      createRequest({nonce, message, teamName, author, team, client: localGqlClient})
    } else {
      createFile(nonce, message, teamName, author, file, team, localGqlClient)
    }
    return { err: false, data: { success: true } }
  } catch(err) {
    console.error(err)
    await pubsub.publish(
      'messages',
      {
        messages: [
          {
            message: 'Sorry, something is wrong I didn\'t get your request.',
            type: 'FAILED_REQUEST',
            author: 'Aura',
            team,
            timestamp: (new Date()).toISOString()
          }
        ]
      }
  )
    return { err: false, data: { success: false } }
  }
}

const sendRequest = (_, args, context) => {
  console.log('sendRequest')
  return executeSendRequest(args)
}

export default sendRequest

