import Sequelize from 'sequelize'
import Umzug from 'umzug'
import path from 'path'
import config from '../config'
import chai from 'chai'
import chaiHttp from 'chai-http'
import db from '../src/db/sequelize/models/db_connection'
import FactoryGirl from 'factory-girl'
import { beforeEach, afterEach } from 'mocha'
config()

const dbConfig = {
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 10,
    idle: 10000,
    acquire: 200000
  },
  retry: {
    max: 0,
  }
}

export const testDB = db
testDB.sequelize.options.logging = false
const migrator = new Umzug({
  storageOptions: {
    sequelize: testDB.sequelize
  },
  migrations: {
    params: [
      testDB.sequelize.getQueryInterface(),
      Sequelize
    ],
    path: path.join(__dirname, "../src/db/sequelize/migrations")
  }
})

const chaiSetUp = () => {
  chai.use(chaiHttp)
  return chai
}
const startUp = () => {
  return migrator.up()
}
const tearDown = () => {
  return testDB.sequelize.truncate({cascade: true})
}

export const prepareTestEnvironment = () => {
    beforeEach(startUp)
    afterEach(tearDown)
    return { chai: chaiSetUp(), server_address: `http://localhost:${process.env.LISTEN_PORT}` }
}

