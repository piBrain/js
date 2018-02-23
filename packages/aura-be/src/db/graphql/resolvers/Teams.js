import db from '../../sequelize/models/db_connection'

const teams = async (obj, args, context) => {
  try {
    return await context.user.getTeams()
  } catch(err) {
    throw err
  }
}

export default teams
