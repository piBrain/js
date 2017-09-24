const configs = {
  local: {
    apiUrl: 'http://localhost:4200',
  },
  development: {
    apiUrl: 'https://p3hr3zqnwc.execute-api.us-east-1.amazonaws.com/dev',
  },
  production: {
    apiUrl: 'https://p3hr3zqnwc.execute-api.us-east-1.amazonaws.com/prod',
  },
}

const NODE_ENV = process.env.NODE_ENV || 'local'

module.exports = function () { return (configs[NODE_ENV]); }
