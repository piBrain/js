const patientAdminInfo = async (obj, args, context) => {
  try {
    let res = await request.post(
        process.env.REDOX_URL+'/'
    )
    res = JSON.parse(res)
    return res
  } catch(err) {
    throw err
  }
}

export default patientAdminInfo
