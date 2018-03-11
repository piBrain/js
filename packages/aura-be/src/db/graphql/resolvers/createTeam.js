import db from '../../sequelize/models/db_connection'
import shortId from 'shortid'
import uuid from 'uuid'

const createTeam = async (obj, { name }, context) => {
  try {
    let team = await db.Team.create({ name })
    await team.addUser(context.user, { through: { type: 'OWNER', active: true, activationNonce: shortId.generate(), tag: uuid.v4() } })
    return { err: false, response: `Success ${name} was created!` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.parent.detail }
  }
}

export default createTeam
