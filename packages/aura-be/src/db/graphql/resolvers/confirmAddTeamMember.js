import db from '../../sequelize/models/db_connection'
import mailClient from '../../../lib/mail_client'

const confirmAddTeamMember = async (obj, { nonce }, context) => {
  try {
    const userteam = await db.UserTeam.findOne({ where: { activationNonce: nonce } })
    if(!userteam) { return { err: true, response: 'Whoops! Something went wrong.' } }
    userteam.set('active', true)
    const team = await userteam.getTeam()
    if(!team.active) { return { err: true, response: 'I\'m sorry that team is no longer active. Please contact the person who invited you to join for more information.' } }
    await userteam.save()
    return { err: false, response: `Successfully joined ${team.name}` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

export default confirmAddTeamMember
