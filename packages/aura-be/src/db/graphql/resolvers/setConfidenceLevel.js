import db from '../../sequelize/models/db_connection'

const executeSetConfidenceLevel = async ({ nonce, messageId }) => {
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const message = await db.Message.findOne({ where: { id: messageId } })
    if(message.get('type') == 'RESPONSE') {
      message.set('confidence', 100.0)
    } else {
      // When we actually have the power to evaluate our messages, we need to edit this to be more robust.
      message.set('confidence', 100.0)
    }
    await message.save()
    return { err: false, response: 'Confidence level set.', data: { confidence: 100.0 }}
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const setConfidenceLevel = (_, args, context) => {
  console.log('setConfidenceLevel')

  return executeSetConfidenceLevel(args)
}

export default setConfidenceLevel

