'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

var _authHandler = require('./authHandler');

var _authHandler2 = _interopRequireDefault(_authHandler);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _mail_client = require('../../../lib/mail_client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeSignUpUser = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (args) {
    console.log('executeSignUpUser');
    let nonce = _shortid2.default.generate();
    let date = new Date();
    date.setHours(date.getHours() + 1);
    try {
      let user, newRecord;

      var _ref2 = yield _db_connection2.default.User.findOrCreate({
        where: {
          $or: {
            activationNonce: nonce,
            email: args.email
          }
        },
        defaults: (0, _extends3.default)({}, args, {
          active: false,
          activationNonce: nonce,
          activationExpiry: date
        })
      });

      var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);

      user = _ref3[0];
      newRecord = _ref3[1];

      if (user.active) {
        return { err: true, response: 'There is already an active user with that email.' };
      }
      if (!newRecord) {
        user.set('activationExpiry', date);
        user.set('activationNonce', nonce);
      }
      yield user.save();
      const url = args.url + `?verify=${nonce}`;
      const email = {
        email: args.email,
        subject: 'Verify Aura User Account',
        content: `Please click <a href=${url}>here</a> to verify your account and finish signing up. <br />Or copy and paste: ${args.url} into your address bar on your browser.<br/>If you did not sign-up for please contact us at aura+support@pibrain.io`,
        type: 'auraUserSignUpConfirmation'
      };
      const returnResponse = `An email has been sent to ${args.email}, please click the link to confirm your account. It will expire 1 hour from now.`;
      return yield _mail_client.mailClient.sendMail(returnResponse, email);
    } catch (err) {
      console.log(err);
      return { err: true, response: err.message };
    }
  });

  return function executeSignUpUser(_x) {
    return _ref.apply(this, arguments);
  };
})();

const signUpUser = (_, args, context) => {
  console.log('signUpUser');
  return executeSignUpUser(args);
};

exports.default = signUpUser;
//# sourceMappingURL=signUpUser.js.map