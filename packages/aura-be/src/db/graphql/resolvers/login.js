import db from '../../sequelize/models/db_connection'
import crypto from 'crypto'

const executeLogin= async ({ email, password }) => {
  try {
    const user = await db.User.findOne({where: { email }})
    if(!user || !user.verifyPassword(password)) {
      return { err: true, response: 'Could not find a user with those credentials.' }
    }
    const nonce = crypto.randomBytes(150).toString('base64')
    await db.Session.destroy({ where: { userId: user.id } })
    const session = await db.Session.create({ userId: user.id, nonce })
    return { err: false, response: 'Success!', data: { nonce } }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message, data: {} }
  }
}

const login = (_, args, context) => {
  console.log('login')
  return executeLogin(args)
}

export default login
