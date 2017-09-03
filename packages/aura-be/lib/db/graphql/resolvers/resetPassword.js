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

var _mail_client = require('../../../lib/mail_client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeResetPassword = ({ nonce, resetToken, newPassword }) => {
  console.log('executeResetPassword');
  return _db_connection2.default.User.findOne({
    where: { resetToken, locked: true, inPasswordReset: true }
  }).then((() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (user) {
      if (!user) {
        return { err: true, response: 'Incorrect code entered, please try again.' };
      }
      clearResetMetaUser(user);
      const expired = isExpired(user.get('resetExpiry'));
      if (!expired) {
        user.set('password', newPassword);
      }
      return user.save().then((0, _asyncToGenerator3.default)(function* () {
        return processSave(nonce, expired);
      })).catch(function (err) {
        if (err.name == 'SequelizeValidationError') {
          return { err: true, response: err.errors.map(function (error) {
              return error.message;
            }) };
        }
        console.error(err);
        return { err: true, response: 'Whoops something went wrong.' };
      });
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })()).catch(err => {
    console.error(err);
    return { err: true, response: err.message };
  });
};

const processSave = (() => {
  var _ref3 = (0, _asyncToGenerator3.default)(function* (nonce, isExpired) {
    try {
      yield clearSessionPasswordResetMetaData(nonce);
    } catch (err) {
      console.error(err);
    }
    if (isExpired) {
      return { err: true, response: 'The password reset has expired please try the process again if you still need to reset your password.' };
    } else {
      try {
        // await sendMail(user.email)
      } catch (err) {
        console.error(err);
      }
      return { err: false, response: 'Success! Please try logging in.' };
    }
  });

  return function processSave(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
})();

const isExpired = expiry => {
  const currentTimestamp = new Date();
  const expiryTimestamp = new Date(expiry);
  return currentTimestamp > expiryTimestamp;
};

const clearResetMetaUser = user => {
  user.set('locked', false);
  user.set('inPasswordReset', false);
  user.set('resetToken', null);
  user.set('resetExpiry', null);
};

const sendMail = (() => {
  var _ref4 = (0, _asyncToGenerator3.default)(function* (email) {
    try {
      const sent = yield _mail_client.mailClient.sendMail(_mail_client.mailClient.createMail((0, _extends3.default)({}, _mail_client.emailDefaults, {
        to: email,
        subject: 'Your password has been reset.',
        content: 'Just letting you know your account has had its password reset. If this was not you, please contact support+aura@pibrain.io.',
        customArgs: { type: 'passwordResetNotification' }
      })));
    } catch (err) {
      console.log(err);
      console.log(err.message, err.response.status, err.response.body, err.response.headers);
      throw 'Sending mail failed.';
    }
  });

  return function sendMail(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

const clearSessionPasswordResetMetaData = nonce => {
  return _db_connection2.default.Session.findOne({ where: { nonce } }).then(session => {
    if (!session) {
      throw 'Session not found.';
    }
    session.set('passwordResetAttempts', 0);
    session.set('suppliedResetEmail', null);
    session.save();
  });
};

const resetPassword = (_, args, context) => {
  console.log('resetPassword');
  return executeResetPassword(args);
};

exports.default = resetPassword;
//# sourceMappingURL=resetPassword.js.map