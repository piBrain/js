'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeVerifyUserEmail = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ nonce, url }) {
    try {
      var user = yield _db_connection2.default.User.findOne({ where: { activationNonce: nonce } });
    } catch (err) {
      return { err: true, response: err.message };
    }
    let resendUrl = `${url}?verify=${nonce}&resend=true&type=userSignUp`;
    if (!user) {
      return { err: false, response: 'Whoops, something went wrong.', noUser: true };
    }
    if (user.active) {
      return { err: false, response: "User already verified. Click <a href='pibrain.io'>here</a> to login.", noUser: false };
    }
    if (new Date() > new Date(user.activationExpiry)) {
      return { err: false, response: `Sorry, the link has expired. Click <a href=${resendUrl}>here</a> to resend.`, noUser: false };
    }
    user.set('active', true);
    try {
      yield user.save();
    } catch (err) {
      return { err: true, response: err.message };
    }
    return { err: false, response: `Thank you for verifying your email! Click <a href=${process.env.PB_DOMAIN}>here</a> to login.` };
  });

  return function executeVerifyUserEmail(_x) {
    return _ref.apply(this, arguments);
  };
})();

const verifyUserEmail = (_, args, context) => {
  console.log('verifyUserEmail');
  return executeVerifyUserEmail(args);
};

exports.default = verifyUserEmail;
//# sourceMappingURL=verifyUserEmail.js.map