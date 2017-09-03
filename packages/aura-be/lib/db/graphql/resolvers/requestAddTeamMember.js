'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

var _mail_client = require('../../../lib/mail_client');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeRequestAddTeamMember = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ nonce, url, targetUser, teamName }) {
    try {
      const session = yield _db_connection2.default.Session.findOne({ where: { nonce } });
      if (!session) {
        return { err: true, response: 'Whoops! Something went wrong.' };
      }
      const user = yield session.getUser();
      if (!user) {
        return { err: true, response: 'Whoops! Something went wrong.' };
      }
      const teams = yield user.getTeams();
      const team = teams.filter(function (team) {
        return team.name == teamName;
      })[0];
      if (team.active == false) {
        return { err: true, response: 'Team is not active!' };
      }
      const newTeamMember = yield _db_connection2.default.User.findOne({ where: { email: targetUser } });
      if (!newTeamMember) {
        return { err: true, response: 'Can\'t find a user with that email' };
      }
      const activationNonce = _shortid2.default.generate();
      team.addUser(newTeamMember, { through: { type: "MEMBER", activationNonce } });
      const confirmUrl = url + `?confirm=${nonce}`;
      const returnResponse = `The request to add ${targetUser} to ${teamName} has been sent! Please tell them to check their email.`;
      const email = {
        to: targetUser,
        from: 'aura@pibrain.io',
        subject: `Join ${teamName} on Aura!`,
        content: `${user.firstName} ${user.lastName} has invited you to join their team ${teamName} on Aura! Please click <a href=${confirmUrl}> here to join the team.`,
        type: 'auraTeamMemberRequest'
      };
      return yield _mail_client.mailClient.sendMail(returnResponse, email);
    } catch (err) {
      console.error(err);
      return { err: true, response: err.message };
    }
  });

  return function executeRequestAddTeamMember(_x) {
    return _ref.apply(this, arguments);
  };
})();

const requestAddTeamMember = (_, args, context) => {
  console.log('addTeamMember');
  return executeRequestAddTeamMember(args);
};

exports.default = requestAddTeamMember;
//# sourceMappingURL=requestAddTeamMember.js.map