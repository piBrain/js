'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeGetSecurityQuestions = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ email, nonce }) {
    try {
      var user = yield _db_connection2.default.User.findOne({
        where: { email },
        attributes: ['secQuestion1', 'secQuestion2']
      });
    } catch (err) {
      return { err: true, response: err.message, data: {} };
    }
    if (!user) {
      return { err: true, response: 'We couldn\'t find a user with that email.', data: {} };
    }
    try {
      var session = yield _db_connection2.default.Session.findOne({
        where: { nonce: nonce }
      });
    } catch (err) {
      return { err: true, response: err.message, data: {} };
    }
    session.set('suppliedResetEmail', email);
    return session.save().then(function () {
      return { err: false, response: '', data: { secQuestion1: user.secQuestion1, secQuestion2: user.secQuestion2 } };
    }).catch(function (err) {
      return { err: true, response: err.message, data: {} };
    });
  });

  return function executeGetSecurityQuestions(_x) {
    return _ref.apply(this, arguments);
  };
})();

const getSecurityQuestions = (_, args, context) => {
  console.log('getSecurityQuestions');
  return executeGetSecurityQuestions(args);
};

exports.default = getSecurityQuestions;
//# sourceMappingURL=getSecurityQuestions.js.map