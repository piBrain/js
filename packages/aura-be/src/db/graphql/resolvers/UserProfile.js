import db from '../../sequelize/models/db_connection'

const UserProfile = (obj, { nonce }, context) => {
  return context.user.get({plain: true})
}

export default UserProfile
