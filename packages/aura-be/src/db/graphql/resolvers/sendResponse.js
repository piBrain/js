import db from '../../sequelize/models/db_connection'
import request from 'request-promise-native'
import pubsub from '../subscriptionClient'
const executeSendResponse = async ({ nonce, userTeamId, userRequest, teamName }) => {
  const transaction  = await db.sequelize.transaction()
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    let user = await session.getUser()
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const userTeam = await db.UserTeam.findOne({ where: { tag: userTeamId } })
    if(!userTeam) { return { err: true, response: 'User or Team does not exist.' } }
    if(!user || user.get('id') != userTeam.get('userId')) {
      throw (`${user.get('firstName')} ${user.get('lastName')} ${user.get('id')} ${teamName} attempted unauthorized request.`)
    }
    let auraRes = await request.post('http://dev.pibrain.ngrok.io/predict', { form : {sentence: userRequest } })
    auraRes = JSON.parse(auraRes)
    const message = await db.Message.create({text: auraRes, type: 'RESPONSE', userTeamId}, {transaction})
    await userTeam.addResponse(response)
    await userTeam.save({transaction})
    await pubsub.publish(
      'messages',
      { messages: [{ message: auraRes, type: 'NEW_RESPONSE', author: 'Aura', team: teamName, timestamp: (new Date()).toISOString()}]}
  )
    transaction.commit()
    return { err: false, data: { success: true } }
  } catch(err) {
    console.error(err)
    transaction.rollback()
    await pubsub.publish(
      'messages',
      { messages: [{ message: 'Something broke. I wasn\'t able to complete your request.', type: 'FAILED_RESPONSE', author: 'Aura', team: teamName }]}
    )
    return { err: true, data: { success: false } }
  }
}

const sendRequest = (_, args, context) => {
  console.log('sendResponse')
  return executeSendResponse(args)
}

export default sendRequest

