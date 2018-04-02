import { prepareTestEnvironment, testDB } from '../../../../spec-helper'
import factories from '../../../../factories/db-factories'
import gql from 'graphql-tag'
const {chai, makeApolloClient, makeAndAuthUser} = prepareTestEnvironment()

const setUpResources = async (resourceMocks) => {
  if(!resourceMocks) {
    throw new Error('No resourse mock data provided.')
  }
  try {
    const patient = await factories.create('patient')
    const patientResources = resourceMocks.map((mock) => {
      factories.create('patientResource', {...mock, patientId: patient.get('id')})
    })
    return { resources: Promise.all(patientResources), patient }
  } catch(err) {
    throw new Error(err)
  }
}


describe('patient resource selection', () => {
  it('should return all of the mock resource data', async () => {
    const mocks = [{ s3Url: 'www.example.com/imafile' , type: 'TRANSCRIPTION'}, { s3Url: 'www.example.com/imafile2', type: 'LAB_RESULT' }]
    const {patientResources, patient} = await setUpResources(mocks)
    const { user, session } = await makeAndAuthUser()
    const apolloClient = makeApolloClient({ 'session-token': session.get('nonce') })
    const resourceQuery = gql`
     query { Patients { resources { s3Url, type } } }
    `
    try {
      const res = await apolloClient.query({
        query: resourceQuery,
        context: { headers: { 'session-token': session.get('nonce') }}
      })
      const expectedReturns = mocks.map((mk) => {
        return { ...mk, __typename: 'PatientResource' }
      })
      chai.expect(res.data.Patients[0].resources).to.deep.eql(expectedReturns)
    } catch(err) {
      throw new Error(err)
    }
  })
})




