import request from 'request-promise-native'

export default async () => {
  const credentials = await request.post(
    process.env.REDOX_URL,
    { form: { apiKey: process.env.REDOX_API_KEY, secret: process.env.REDOX_SECRET } }
  )
  return JSON.parse(credentials)
}

