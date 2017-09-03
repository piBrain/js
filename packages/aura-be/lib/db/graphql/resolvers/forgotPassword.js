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

var _mail_client = require('../../../lib/mail_client');

var _txt_message_client = require('../../../lib/txt_message_client');

var _txt_message_client2 = _interopRequireDefault(_txt_message_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeForgotPassword = ({ nonce, secQuestionResponse1, secQuestionResponse2 }) => {
  console.log('executeForgotPassword');
  const date = new Date();
  return _db_connection2.default.Session.findOne({ where: { nonce } }).then(session => {
    if (!session) {
      return { err: true, response: "Whoops something went wrong." };
    }
    const prevDate = new Date(session.lastPasswordResetAttempt);
    if (prevDate.setDate(prevDate.getDate() + 1) <= date) {
      session.set('passwordResetAttempts', 0);
    }
    if (session.passwordResetAttempts >= 3) {
      return { err: true, response: "Sorry. You have exceeded the maximum reset attempts allowed. Please try again in a few hours." };
    }
    session.set('passwordResetAttempts', session.passwordResetAttempts + 1);
    session.set('lastPasswordResetAttempt', date);
    return session.save().then(() => {
      return verifyAndEmailUser(session.suppliedResetEmail, secQuestionResponse1, secQuestionResponse2);
    });
  });
};

const verifyAndEmailUser = (email, secQuestionResponse1, secQuestionResponse2) => {
  return _db_connection2.default.User.findOne({
    where: {
      $and: {
        email,
        secQuestionResponse1,
        secQuestionResponse2
      }
    }
  }).then((() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (user) {
      if (!user) {
        return { err: false, response: 'Sorry that doesn\'t seem to match up.' };
      };
      const resetToken = _shortid2.default.generate();
      const expiryDate = new Date();
      user.set('locked', true);
      user.set('inPasswordReset', true);
      user.set('resetToken', resetToken);
      user.set('resetExpiry', expiryDate.setDate(expiryDate.getDate() + 1));
      yield _txt_message_client2.default.sendMessage(`Your Aura password reset token is: ${resetToken}`, user.phoneNumber);
      return user.save().then(function () {
        return { err: false, response: `A text with a reset code has been sent to the number ending in ${user.phoneNumber.substring(7)}` };
      });
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })()).catch(err => {
    console.error(err);
    return { err: true, response: 'Whoops something went wrong.' };
  });
};

const forgotPassword = (_, args, context) => {
  console.log('forgotPassword');
  return executeForgotPassword(args);
};

exports.default = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map