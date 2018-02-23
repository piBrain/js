
import db from '../../sequelize/models/db_connection'

const messages = async (obj, {timeStamp, teamFilter}, context) => {
  try {
    let teams = await context.user.getTeams()
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
      where: { userTeamId: userTeams.map((ut) => ut.tag), createdAt: { gte: limit } },
      include: [
        {
          model: db.UserTeam,
          required: true,
          attributes: ['TeamId', 'UserId'],
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
            attributes: ['TeamId', 'UserId'],
            include: [
              {model: db.Team, attributes: ['name']},
              {model: db.User, attributes: ['firstName', 'lastName']}
            ]
          }
        ],
        limit: 25
      }) || []
    }
    const isUser = (msg) => {
      if(msg.type == 'REQUEST' || msg.type == 'FILE') {
        return msg.UserTeam.User
      }
      return { firstName: 'Aura', lastName: '', id: -1, email: 'aura@pibrain.io', active: true, phoneNumber: '3141592653' }
    }
    const formattedMessages = messages.map((msg) => {
      return {
        message: msg.text,
        author: isUser(msg),
        team: msg.UserTeam.Team,
        confidence: msg.confidence,
        timestamp: msg.created_at
      }
    })
    return formattedMessages
  } catch(err) {
    console.error(err)
    throw err
  }
}

export default messages
