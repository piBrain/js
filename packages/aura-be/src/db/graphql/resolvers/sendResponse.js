import db from '../../sequelize/models/db_connection'

const executeSendResponse = async ({ nonce, userTeamId, message }) => {
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const userTeam = await db.UserTeam.findOne({ where: { tag: userTeamId } })
    if(!userTeam) { return { err: true, response: 'User or Team no longer exists.' } }
    const response = await db.Message.create({text: message, type: 'RESPONSE', userTeamId})
    await userTeam.addResponse(response)
    await userTeam.save()
    return { err: false, response: `Response added.` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const sendRequest = (_, args, context) => {
  console.log('sendResponse')
  return executeSendResponse(args)
}

export default sendRequest

