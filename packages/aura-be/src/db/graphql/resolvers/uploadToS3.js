import db from '../../sequelize/models/db_connection'

const executeUploadToS3 = async ({ nonce, userTeamId, file, fileName, teamName}) => {
  return { err: false, data: { path: 'testPath', fileName: fileName } }
}

const uploadToS3 = (_, args, context) => {
  console.log('uploadToS3')
  return executeUploadToS3(args)
}

export default uploadToS3
