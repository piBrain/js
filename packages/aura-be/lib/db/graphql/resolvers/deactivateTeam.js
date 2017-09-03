'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeDeactivateTeam = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ nonce, name }) {
    try {
      let session = yield _db_connection2.default.Session.findOne({ where: { nonce } });
      if (!session) {
        return { err: true, response: 'Whoops! Something went wrong.' };
      }
      let user = yield session.getUser();
      if (!user) {
        return { err: true, response: 'Whoops! Something went wrong.' };
      }
      const teams = yield user.getTeams();
      const team = teams.filter(function (team) {
        return team.name == name;
      })[0];
      if (!team.active) {
        return { err: true, response: 'Team already deactivated!' };
      }
      const userTeam = team.UserTeam;
      if (userTeam.get('type') != 'OWNER') {
        return { err: true, response: `Must be the owner of the team!` };
      }
      team.set('active', false);
      yield team.save();
      return { err: false, response: `Success ${name} was deactivated!` };
    } catch (err) {
      console.error(err);
      return { err: true, response: err.message };
    }
  });

  return function executeDeactivateTeam(_x) {
    return _ref.apply(this, arguments);
  };
})();

const deactivateTeam = (_, args, context) => {
  console.log('deactivateTeam');
  return executeDeactivateTeam(args);
};

exports.default = deactivateTeam;
//# sourceMappingURL=deactivateTeam.js.map