'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let authHandler = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (context, callback, callback_args) {
    const session = yield _db_connection2.default.Session.findOne({ where: { nonce: context.token } });
    if (session == null) {
      console.log('no session found - skipping execution');
      return;
    }
    const user = yield _db_connection2.default.User.findOne({ where: { id: session && session.userId } });
    if (typeof user === "undefined" || user == null) {
      console.log('no user found - skipping execution');
      return;
    }
    return callback((0, _extends3.default)({}, callback_args, { userId: user.id }));
  });

  return function authHandler(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = authHandler;
//# sourceMappingURL=authHandler.js.map