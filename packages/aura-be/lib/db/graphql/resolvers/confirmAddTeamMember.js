'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

var _mail_client = require('../../../lib/mail_client');

var _mail_client2 = _interopRequireDefault(_mail_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeConfirmAddTeamMember = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ nonce }) {
    try {
      const userteam = yield _db_connection2.default.UserTeam.findOne({ where: { activationNonce: nonce } });
      if (!userteam) {
        return { err: true, response: 'Whoops! Something went wrong.' };
      }
      const session = yield _db_connection2.default.Session.findOne({ where: { userId: userteam.userId } });
      if (!session) {
        return { err: true, response: 'Whoops! Something went wrong.' };
      }
      userteam.set('active', true);
      const team = yield userteam.getTeam();
      if (!team.active) {
        return { err: true, response: 'I\'m sorry that team is no longer active. Please contact the person who invited you to join for more information.' };
      }
      yield userteam.save();
      return { err: false, response: `Successfully joined ${team.name}` };
    } catch (err) {
      console.error(err);
      return { err: true, response: err.message };
    }
  });

  return function executeConfirmAddTeamMember(_x) {
    return _ref.apply(this, arguments);
  };
})();

const confirmAddTeamMember = (_, args, context) => {
  console.log('addTeamMember');
  return executeConfirmAddTeamMember(args);
};

exports.default = confirmAddTeamMember;
//# sourceMappingURL=confirmAddTeamMember.js.map