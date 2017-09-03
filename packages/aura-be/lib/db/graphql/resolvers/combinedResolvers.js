'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _signUpUser = require('./signUpUser');

var _signUpUser2 = _interopRequireDefault(_signUpUser);

var _newsletterSignUp = require('./newsletterSignUp');

var _newsletterSignUp2 = _interopRequireDefault(_newsletterSignUp);

var _verifyUserEmail = require('./verifyUserEmail');

var _verifyUserEmail2 = _interopRequireDefault(_verifyUserEmail);

var _verifyNewsletterEmail = require('./verifyNewsletterEmail');

var _verifyNewsletterEmail2 = _interopRequireDefault(_verifyNewsletterEmail);

var _getSecurityQuestions = require('./getSecurityQuestions');

var _getSecurityQuestions2 = _interopRequireDefault(_getSecurityQuestions);

var _forgotPassword = require('./forgotPassword');

var _forgotPassword2 = _interopRequireDefault(_forgotPassword);

var _resetPassword = require('./resetPassword');

var _resetPassword2 = _interopRequireDefault(_resetPassword);

var _returnProfileInfo = require('./returnProfileInfo');

var _returnProfileInfo2 = _interopRequireDefault(_returnProfileInfo);

var _updateProfileInfo = require('./updateProfileInfo');

var _updateProfileInfo2 = _interopRequireDefault(_updateProfileInfo);

var _createTeam = require('./createTeam');

var _createTeam2 = _interopRequireDefault(_createTeam);

var _getTeams = require('./getTeams');

var _getTeams2 = _interopRequireDefault(_getTeams);

var _promoteMemberToAdmin = require('./promoteMemberToAdmin');

var _promoteMemberToAdmin2 = _interopRequireDefault(_promoteMemberToAdmin);

var _requestAddTeamMember = require('./requestAddTeamMember');

var _requestAddTeamMember2 = _interopRequireDefault(_requestAddTeamMember);

var _confirmAddTeamMember = require('./confirmAddTeamMember');

var _confirmAddTeamMember2 = _interopRequireDefault(_confirmAddTeamMember);

var _deactivateTeam = require('./deactivateTeam');

var _deactivateTeam2 = _interopRequireDefault(_deactivateTeam);

var _reactivateTeam = require('./reactivateTeam');

var _reactivateTeam2 = _interopRequireDefault(_reactivateTeam);

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _graphqlIsoDate = require('graphql-iso-date');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queries = { Query: { getSecurityQuestions: _getSecurityQuestions2.default, returnProfileInfo: _returnProfileInfo2.default, getTeams: _getTeams2.default } };
const mutations = {
  Mutation: {
    confirmAddTeamMember: _confirmAddTeamMember2.default,
    createTeam: _createTeam2.default,
    deactivateTeam: _deactivateTeam2.default,
    forgotPassword: _forgotPassword2.default,
    newsletterSignUp: _newsletterSignUp2.default,
    reactivateTeam: _reactivateTeam2.default,
    requestAddTeamMember: _requestAddTeamMember2.default,
    resetPassword: _resetPassword2.default,
    signUpUser: _signUpUser2.default,
    updateProfileInfo: _updateProfileInfo2.default,
    verifyNewsletterEmail: _verifyNewsletterEmail2.default,
    verifyUserEmail: _verifyUserEmail2.default,
    promoteMemberToAdmin: _promoteMemberToAdmin2.default
  }
};
const scalarResolvers = {
  JSON: _graphqlTypeJson2.default,
  DateTime: _graphqlIsoDate.GraphQLDateTime
};
exports.default = (0, _lodash.merge)({}, queries, mutations, scalarResolvers);
//# sourceMappingURL=combinedResolvers.js.map