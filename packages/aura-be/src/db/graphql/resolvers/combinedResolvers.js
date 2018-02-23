import { merge  } from 'lodash'
import Apis from './Apis'
import confirmAddTeamMember from './confirmAddTeamMember'
import createTeam from './createTeam'
import deactivateTeam from './deactivateTeam'
import forgotPassword from './forgotPassword'
import Messages from './Messages'
import Teams from './Teams'
import newsletterSignUp from './newsletterSignUp'
import promoteMemberToAdmin from './promoteMemberToAdmin'
import reactivateTeam from './reactivateTeam'
import requestAddTeamMember from './requestAddTeamMember'
import resetPassword from './resetPassword'
import returnProfileInfo from './returnProfileInfo'
import sendRequest from './sendRequest'
import sendResponse from './sendResponse'
import setConfidenceLevel from './setConfidenceLevel'
import signUpUser from './signUpUser'
import toggleApi from './toggleApi'
import updateProfileInfo from './updateProfileInfo'
import uploadToS3 from './uploadToS3'
import verifyNewsletterEmail from './verifyNewsletterEmail'
import verifyUserEmail from './verifyUserEmail'
import GraphQLJSON from 'graphql-type-json'
import  pubsub from '../subscriptionClient'
import { GraphQLDateTime, GraphQLDate } from 'graphql-iso-date'

const queries = { Query: { returnProfileInfo, Teams, Apis, Messages } }
const mutations = {
  Mutation: {
    confirmAddTeamMember,
    createTeam,
    deactivateTeam,
    newsletterSignUp,
    promoteMemberToAdmin,
    reactivateTeam,
    requestAddTeamMember,
    resetPassword,
    sendRequest,
    sendResponse,
    setConfidenceLevel,
    signUpUser,
    toggleApi,
    updateProfileInfo,
    uploadToS3,
    verifyNewsletterEmail,
    verifyUserEmail,
  }
}
const subscriptions = {
  Subscription: {
    teams: { subscribe: () => pubsub.asyncIterator('teams') },
    messages: { subscribe: () => pubsub.asyncIterator('messages') },
  }
}
const scalarResolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
  Date: GraphQLDate
}
export default merge({}, queries, mutations, subscriptions, scalarResolvers)
