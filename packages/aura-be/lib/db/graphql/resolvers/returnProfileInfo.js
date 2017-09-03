'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeReturnProfileInfo = (() => {
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
      return { err: false, response: 'Success!', data: (0, _extends3.default)({}, user.get({ plain: true })) };
    } catch (err) {
      console.error(err);
      return { err: true, response: err.message, data: {} };
    }
  });

  return function executeReturnProfileInfo(_x) {
    return _ref.apply(this, arguments);
  };
})();

const returnProfileInfo = (_, args, context) => {
  console.log('returnProfileInfo');
  return executeReturnProfileInfo(args);
};

exports.default = returnProfileInfo;
//# sourceMappingURL=returnProfileInfo.js.map