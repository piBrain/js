import db from '../../sequelize/models/db_connection'

const executeSendRequest = async ({ nonce, teamName, message, state } = { state: null }) => {
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.' } }
    let user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.' } }
    const teams = await user.getTeams()
    const team = teams.filter((team) => (team.name == teamName))[0]
    if(!team) { return { err: true, response: 'You are not a member of that team.' } }
    if(!team.active) { return { err: true, response: 'Team not active! Cannot send request.' } }
    const request = await db.Message.create({text: message, state: state, type: 'REQUEST', userTeamId: team.UserTeam.get('tag')})
    await team.UserTeam.addRequest(request)
    await team.UserTeam.save()
    return { err: false, response: `Sure, let me handle that for you.` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message }
  }
}

const sendRequest = (_, args, context) => {
  console.log('sendRequest')
  return executeSendRequest(args)
}

export default sendRequest

