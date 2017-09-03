'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeGetTeams = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ nonce }) {
    try {
      let session = yield _db_connection2.default.Session.findOne({ where: { nonce } });
      if (!session) {
        return { err: true, response: 'Whoops! Something went wrong.', data: {} };
      }
      let user = yield session.getUser();
      if (!user) {
        return { err: true, response: 'Whoops! Something went wrong.', data: {} };
      }
      let teams = yield user.getTeams();
      return { err: false, response: `Success!`, data: { teams } };
    } catch (err) {
      console.error(err);
      return { err: true, response: err.message, data: {} };
    }
  });

  return function executeGetTeams(_x) {
    return _ref.apply(this, arguments);
  };
})();

const getTeams = (_, args, context) => {
  console.log('getTeams');
  return executeGetTeams(args);
};

exports.default = getTeams;
//# sourceMappingURL=getTeams.js.map