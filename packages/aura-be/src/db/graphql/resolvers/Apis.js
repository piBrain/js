const apis = async ( obj, args, context ) => {
  try {
    const teams = await context.users.getTeams()
    const teamFromName = teams.find((team) => ( team.get('name') == args.teamName  ))
    return await teamFromName.getApis()
  } catch(err) {
    throw err
  }
}

export default apis
