import Apis from './Apis'
import GraphQLJSON from 'graphql-type-json'
import { MedicalProfessionals, MedicalProfessional } from './MedicalProfessionals'
import Messages from './Messages'
import { Patients, Patient } from './Patients'
import patientTypeResolver from './PatientTypeResolver'
import Teams from './Teams'
import UserProfile from './UserProfile'
import confirmAddTeamMember from './confirmAddTeamMember'
import createTeam from './createTeam'
import db from '../../sequelize/models/db_connection'
import deactivateTeam from './deactivateTeam'
import forgotPassword from './forgotPassword'
import newsletterSignUp from './newsletterSignUp'
import promoteMemberToAdmin from './promoteMemberToAdmin'
import pubsub from '../subscriptionClient'
import reactivateTeam from './reactivateTeam'
import requestAddTeamMember from './requestAddTeamMember'
import resetPassword from './resetPassword'
import sendResponse from './sendResponse'
import setConfidenceLevel from './setConfidenceLevel'
import signUpUser from './signUpUser'
import updateProfileInfo from './updateProfileInfo'
import uploadToS3 from './uploadToS3'
import verifyNewsletterEmail from './verifyNewsletterEmail'
import verifyUserEmail from './verifyUserEmail'
import { GraphQLDateTime, GraphQLDate } from 'graphql-iso-date'
import { merge  } from 'lodash'
const queries = { Query: { UserProfile, Teams, Apis, MedicalProfessional, MedicalProfessionals, Messages, Patients, Patient}, }
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
    sendResponse,
    signUpUser,
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

export default merge({}, queries, mutations, subscriptions, scalarResolvers, patientTypeResolver)
