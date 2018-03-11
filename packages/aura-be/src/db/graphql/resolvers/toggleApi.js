import db from '../../sequelize/models/db_connection'

const executeToggleApi = async (obj, { apidId }, context) => {
  try {
    let api = await db.Api.findOne({ id: apidId })
    api.set('active', !(api.get('active')))
    await api.save()
    return { err: false, response: `Success ${api.get('name')} was activated!` }
  } catch(err) {
    console.error(err)
    return { err: true, response: err }
  }
}

const toggleApi = (obj, args, context) => {
  console.log('toggleApi')
  executeToggleApi(obj, args, context)
}

export default toggleApi
