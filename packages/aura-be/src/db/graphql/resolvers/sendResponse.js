import db from '../../sequelize/models/db_connection'
import request from 'request-promise-native'
import pubsub from '../subscriptionClient'
const auraProcessRequest = async (transaction, userRequest, userTeamId) => {
  let auraRes = await request.post(
    'http://localhost:5000/predict',
    { form : {sentence: userRequest } }
  )
  auraRes = JSON.parse(auraRes)
  return auraRes.join(' ')
}
const executeSendResponse = async ({ nonce, userTeamId, userRequest, teamName, file }) => {
  const transaction  = await db.sequelize.transaction()
  const userTeam = await db.UserTeam.findOne({ where: { tag: userTeamId } })
  if(!userTeam) { return { err: true, response: 'User or Team does not exist.' } }
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    let user = await session.getUser()
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    if(!user || user.get('id') != userTeam.get('userId')) {
      throw (`${user.get('firstName')} ${user.get('lastName')} ${user.get('id')} ${teamName} attempted unauthorized request.`)
    }
    var auraRes;
    if(!file) {
      auraRes = await auraProcessRequest(transaction, userRequest, userTeamId)
    } else {
      auraRes = "What would you like me to do with the file?"
    }
    const message = await db.Message.create({text: auraRes, type: 'RESPONSE', userTeamId}, {transaction})
    await userTeam.addResponse(message)
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
    const response = 'Something broke. I wasn\'t able to complete your request.'
    const message = await db.Message.create({text: response, type: 'RESPONSE', userTeamId})
    await userTeam.addResponse(message)
    await userTeam.save()
    await pubsub.publish(
      'messages',
      { messages: [{ message: response, type: 'FAILED_RESPONSE', author: 'Aura', team: teamName }]}
    )
    return { err: true, data: { success: false } }
  }
}

const sendRequest = (_, args, context) => {
  console.log('sendResponse')
  return executeSendResponse(args)
}

export default sendRequest

