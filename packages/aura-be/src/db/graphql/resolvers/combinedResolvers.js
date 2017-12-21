import { merge  } from 'lodash'
import signUpUser from './signUpUser'
import newsletterSignUp from './newsletterSignUp'
import verifyUserEmail from './verifyUserEmail'
import verifyNewsletterEmail from './verifyNewsletterEmail'
import getSecurityQuestions from './getSecurityQuestions'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import returnProfileInfo from './returnProfileInfo'
import updateProfileInfo from './updateProfileInfo'
import createTeam from './createTeam'
import getTeams from './getTeams'
import getMessages from './getMessages'
import promoteMemberToAdmin from './promoteMemberToAdmin'
import requestAddTeamMember from './requestAddTeamMember'
import confirmAddTeamMember from './confirmAddTeamMember'
import deactivateTeam from './deactivateTeam'
import reactivateTeam from './reactivateTeam'
import sendRequest from './sendRequest'
import sendResponse from './sendResponse'
import setConfidenceLevel from './setConfidenceLevel'
import login from './login'
import GraphQLJSON from 'graphql-type-json'
import  pubsub from '../subscriptionClient'
import { GraphQLDateTime, GraphQLDate } from 'graphql-iso-date'

const queries = { Query: { getSecurityQuestions, returnProfileInfo, getTeams, getMessages } }
const mutations = {
  Mutation: {
    confirmAddTeamMember,
    createTeam,
    deactivateTeam,
    forgotPassword,
    login,
    newsletterSignUp,
    reactivateTeam,
    requestAddTeamMember,
    resetPassword,
    sendRequest,
    sendResponse,
    setConfidenceLevel,
    signUpUser,
    updateProfileInfo,
    verifyNewsletterEmail,
    verifyUserEmail,
    promoteMemberToAdmin,
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
