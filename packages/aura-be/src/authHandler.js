import db from './db/sequelize/models/db_connection'

async function authHandler(sessionToken) {
  try {
    const session = await db.Session.findOne({ where: { nonce: sessionToken } })
    if(!session) {
      console.log('no session found - skipping execution')
      const error = new Error('No session.')
      throw error
    }
    const user = await session.getUser()
    if ( typeof user === "undefined" || user == null) {
      console.log('no user found - skipping execution')
      const error = new Error('No user for session.')
      throw error
    }
    return { user, session }
  } catch(err) {
    throw err
  }
}


export default authHandler
