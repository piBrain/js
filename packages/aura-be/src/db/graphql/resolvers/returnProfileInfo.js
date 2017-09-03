import db from '../../sequelize/models/db_connection'

const executeReturnProfileInfo = async ({ nonce }) => {
  try {
    let session = await db.Session.findOne(
      { where: { nonce } },
    )
    if(!session) { return { err: true, response: 'Whoops! Something went wrong.', data: {} } }
    let user = await session.getUser()
    if(!user) { return { err: true, response: 'Whoops! Something went wrong.', data: {} } }
    return { err: false, response: 'Success!', data: { ...user.get({ plain: true }) } }
  } catch(err) {
    console.error(err)
    return { err: true, response: err.message, data: {} }
  }
}


const returnProfileInfo = (_, args, context) => {
  console.log('returnProfileInfo')
  return executeReturnProfileInfo(args)
}

export default returnProfileInfo
