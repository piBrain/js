'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeCreateTeam = (() => {
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
      let team = yield _db_connection2.default.Team.create({ name });
      yield team.addUser(user, { through: { type: 'OWNER', active: true, activationNonce: _shortid2.default.generate() } });
      return { err: false, response: `Success ${name} was created!` };
    } catch (err) {
      console.error(err);
      return { err: true, response: err.message };
    }
  });

  return function executeCreateTeam(_x) {
    return _ref.apply(this, arguments);
  };
})();

const createTeam = (_, args, context) => {
  console.log('createTeam');
  return executeCreateTeam(args);
};

exports.default = createTeam;
//# sourceMappingURL=createTeam.js.map