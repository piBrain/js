import db from '../../sequelize/models/db_connection'

const deactivateTeam = async (obj, { nonce, name }, context) => {
  try {
    const teams = await context.user.getTeams()
    const team = teams.filter((team) => (team.name == name))[0]
    if(!team.active) { return { err: true, response: 'Team already deactivated!' } }
    const userTeam = team.UserTeam
    if(userTeam.get('type') != 'OWNER') { return { err: true, response: `Must be the owner of the team!`} }
    team.set('active', false)
    await team.save()
    return { err: false, response: `Success ${name} was deactivated!` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

export default deactivateTeam

