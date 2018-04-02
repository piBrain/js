import db from './db/sequelize/models/db_connection'
import crypto from 'crypto'

const login = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const email = req.body.email
  const password = req.body.password
  try {
    const user = await db.User.findOne({where: { email }})
    if(!user || !user.verifyPassword(password)) {
      const body = { err: true, response: 'Could not find a user with those credentials.' }
      res.status(403)
         .send(JSON.stringify(body))
         .end()
      return
    }
    const token = crypto.randomBytes(150).toString('base64')
    await db.Session.destroy({ where: { userId: user.id } })
    const session = await db.Session.create({ userId: user.id, nonce: token })
    const result = { err: false, response: 'Success!', data: { token, user } }
    res.send(JSON.stringify(result))
  } catch(err) {
    console.error(err)
    const body = { err: true, response: err.message, data: {} }
    res.status(403)
       .send(JSON.stringify(body))
       .end()
  }
}

export default login
