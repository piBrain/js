import fs from 'fs'
const isOneDimensional = (obj) => {
  if(typeof obj !== 'object') { return true };
  for(let x of Object.keys(obj)) {
    if(typeof obj[x] === 'object') { return false };
  }
  return true
}
const deepMerge = (lhs, rhs) => {
  if(typeof rhs !== 'object') {
    return rhs
  } else if(isOneDimensional(rhs)) {
    if(typeof lhs !== 'object') { return rhs };
    return { ...lhs, ...rhs }
  }
  const rhsKeys = new Set(Object.keys(rhs))
  const lhsKeys = new Set(Object.keys(lhs))
  const lhsDiff = [...lhsKeys].filter(x => !rhsKeys.has(x))
  const rhsDiff = [...rhsKeys].filter(x => !lhsKeys.has(x))
  const intersect = [...lhsKeys].filter(x => rhsKeys.has(x))
  const uniqueLhs = lhsDiff.map(x => ({ [x]: lhs[x] }))
  const uniqueRhs = rhsDiff.map(x => ({ [x]: rhs[x] }))
  const merged = intersect.map(x => ({ [x]: deepMerge(lhs[x], rhs[x])}))
  return Object.assign(lhs, ...merged, ...uniqueLhs, ...uniqueRhs)
}
const configsFromFile = JSON.parse(fs.readFileSync('.configs', 'utf-8'))
var configs = {
  local: {
    DATABASE_URL: 'postgres://127.0.0.1:5432/aura_be_local',
    GOOGLE_CLIENT_ID: '490447248487-367u8f0drevjtgajlslp4inc8ch2s8f0.apps.googleusercontent.com',
    GSUITE_DOMAIN: 'pibrain.io',
    PB_DOMAIN: 'http://localhost:4200',
    LISTEN_PORT: '4200',
    AWS_ACCESS_KEY_ID: 'AKIAJMMUKXNKT7GKGOWQ',
    AWS_SECRET_KEY: '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',
    S3_BUCKET_NAME: 'pibrain.dev.general',
    SENDGRID_API_KEY: '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',
    SENDGRID_NEWSLETTER_LIST_ID: '1570751',
    TWILIO_AUTH_TOKEN: 'a338f496c1d52cde98d98492e1fa9cba',
    TWILIO_ACCOUNT_SID: 'ACf6ed1d4c46b1d094ca9c827fb38f28e2',
    TWILIO_PHONE_NUMBER: '+12083141596',
  },
  test: {
    DATABASE_URL: 'postgres://localhost/aura_test',
    TWILIO_AUTH_TOKEN: 'EXAMPLE',
    TWILIO_ACCOUNT_SID: 'ACf6ed1d4c46b1d094ca9c827fb38f28e2',
    TWILIO_PHONE_NUMBER: 'EXAMPLE',
    LISTEN_PORT: "7327"
  }
}
var configs = deepMerge(configs, configsFromFile)
const NODE_ENV = process.env.NODE_ENV || 'local'
module.exports = () => {
  process.env = Object.assign(process.env, configs[NODE_ENV])
}
