import { prepareTestEnvironment, testDB } from '../../../../spec-helper'
import factories from '../../../../factories/db-factories'
const { chai, server_address } = prepareTestEnvironment()

const setUp = async (apiEnabled=false) => {
  try {
    const userTeam = await factories.build('userTeam')
    userTeam.save()
    const user = await userTeam.getUser()
    const team = await userTeam.getTeam()
    const session = await factories.create('session', {user_id: user.get('id')})
    const api = await factories.create('api', { active: true, name: 'TEST' })
    return { user, team, session, api }
  } catch(err) {
    throw err
  }
}
describe('Api Selection', () => {
  it('should return information on all api objects', () => {
      const apiQuery = {
        query: '{ api { name } }'
      }
      return chai.request(server_address)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('query', JSON.stringify(apiQuery))
      .then((res) => {
        expect(res.data.apis.length).to.be.above(0)
        expect(res.data.apis[0].name).to.exist()
        expect(res.data.apis[0].id).to.exist()
        expect(res.data.apis[0].enabled).to.exist()
      })
      .catch((err) => {
        throw err.text
      })
  })

  it('should toggle an existing api for admins/owners', async () => {
    const { user, team, session, api } = await setUp()
    const apiActive = api.get('active')
    const apiQuery = {
      query: `mutation {
          toggleApi(apiId: ${api.get('id')})
        }`
    }
    return chai.request(server_address)
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .set('Session-Token', session.get('nonce'))
    .send(JSON.stringify(apiQuery))
    .then( async (res) => {
      const data = res.data
      await api.reload()
      chai.expect(api.get('active')).to.equal(!apiActive)
    }).catch((err) => {
      throw err
    })

  })

  it('should not allow non admins/owners to change anything', () => {

  })

  it('should allow piBrain employees to add additional api entries', () => {
    throw 'ERR'
  })

  it('should not allow non piBrain employees to add additional api entries', () => {
    throw 'ERR'
  })

  it('should allow piBrain employees to deprecate apis', () => {
    throw 'ERR'
  })

  it('should not allow non employees to deprecate apis', () => {
    throw 'ERR'
  })
})
