
import db from '../../sequelize/models/db_connection'

const executeGetMessages = async ({ nonce, timeStamp, teamFilter}) => {
  try {
    let session =  await db.Session.findOne({ where: { nonce } })
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.', data: {} } }
    let user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.', data: {} } }
    let teams = await user.getTeams()
    if(!teams) { return { err: false, response: 'No teams.', data: { messages: [] } } }
    var userTeams = []
    if(teamFilter) {
      const team = teams.filter((team) => (team.name == teamFilter.name))[0]
      userTeams = [team.UserTeam]
    } else {
      userTeams = teams.map((team) => (team.UserTeam))
    }
    let limit = new Date(timeStamp)
    limit.setHours(limit.getHours()-24)
    limit = limit.toISOString()
    var messages = await db.Message.findAll({
      where: { userTeamId: userTeams.map((ut) => ut.tag), created_at: { gte: limit } },
      include: [
        {
          model: db.UserTeam,
          required: true,
          attributes: ['team_id', 'user_id'],
          include: [
            {model: db.Team, attributes: ['name']},
            {model: db.User, attributes: ['firstName', 'lastName']}
          ]
        }
      ]
    }) || []
    if(messages.length == 0) {
      messages = await db.Message.findAll({
        where: { userTeamId: userTeams.map((ut) => ut.tag) },
        include: [
          {
            model: db.UserTeam,
            required: true,
            attributes: ['team_id', 'user_id'],
            include: [
              {model: db.Team, attributes: ['name']},
              {model: db.User, attributes: ['firstName', 'lastName']}
            ]
          }
        ],
        limit: 25
      }) || []
    }
    const formattedMessages = messages.map((msg) => {
      return {
        message: msg.text,
        author: msg.UserTeam.User.firstName + ' ' + msg.UserTeam.User.lastName,
        team: teamFilter.name,
        confidence: msg.confidence,
        timestamp: msg.created_at
      }
    })
    return { err: false, response: `Success!`, data: { messages: formattedMessages } }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message, data: {} }
  }
}

const getMessages = (_, args, context) => {
  console.log('getMessages')
  return executeGetMessages(args)
}

export default getMessages
