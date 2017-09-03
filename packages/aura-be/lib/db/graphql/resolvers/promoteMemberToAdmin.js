'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executePromoteMemberToAdmin = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ nonce, targetUser, teamName }) {
    try {
      const session = yield _db_connection2.default.Session.findOne({ where: { nonce } });
      if (!session) {
        return { err: true, response: 'Whoops! Something went wrong.', data: {} };
      }
      const user = yield _db_connection2.default.User.findOne({ where: { email: targetUser } });
      if (!user) {
        return { err: true, response: 'Whoops! Something went wrong.', data: {} };
      }
      const teams = yield user.getTeams();
      const team = teams.filter(function (team) {
        return team.name == teamName;
      })[0];
      if (!team.active) {
        return { err: true, response: 'Team not active!' };
      }
      const userTeam = team.UserTeam;
      if (!userTeam.active) {
        return { err: true, response: `${user.firstName} has not accepted their invite yet!` };
      }
      if (userTeam.get('type') == 'ADMIN' || userTeam.get('type') == 'OWNER') {
        return { err: true, response: `${user.firstName} is already an admin or owner!` };
      }
      userTeam.set('type', 'ADMIN');
      yield userTeam.save();
      return { err: false, response: 'Success!' };
    } catch (err) {
      console.error(err);
      return { err: true, response: err.message, data: {} };
    }
  });

  return function executePromoteMemberToAdmin(_x) {
    return _ref.apply(this, arguments);
  };
})();

const promoteMemberToAdmin = (_, args, context) => {
  console.log('promoteMemberToAdmin');
  return executePromoteMemberToAdmin(args);
};

exports.default = promoteMemberToAdmin;
//# sourceMappingURL=promoteMemberToAdmin.js.map