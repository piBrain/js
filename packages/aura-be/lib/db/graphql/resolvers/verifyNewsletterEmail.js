'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mail_client = require('../../../lib/mail_client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeVerifyNewsletterEmail = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ url, timestamp, email, firstName, lastName, organization }) {
    let resendUrl = `${url}?resend=true&type=newsletterSignUp&email=${email}&firstName=${firstName}&lastName=${lastName}&organization=${organization}`;
    if (new Date() > new Date(timestamp)) {
      return { err: false, response: `Sorry, the link has expired. Click <a href=${resendUrl}>here</a> to resend.` };
    }
    try {
      yield _mail_client.mailClient.addNewContact({ email: email, first_name: firstName, last_name: lastName, organization: organization }, process.env.SENDGRID_NEWSLETTER_LIST_ID);
    } catch (err) {
      if (Array.isArray(err)) {
        return handleErrArray(err);
      } else {
        return handleHttpOrStandardError(err);
      }
    }
    return { err: false, response: `Thank you for verifying your email!` };
  });

  return function executeVerifyNewsletterEmail(_x) {
    return _ref.apply(this, arguments);
  };
})();

const handleErrArray = errs => {
  const errMessages = errs.map(err => err.message);
  console.error(errMessages);
  return { err: true, response: errMessages };
};

const handleHttpOrStandardErrors = err => {
  if (err.response) {
    console.error(err.message, err.response.status, err.response.body, err.response.headers);
  } else {
    console.error(err.message);
  }
  return { err: true, response: err.message };
};

const verifyNewsletterEmail = (_, args, context) => {
  console.log('verifyNewsletterEmail');
  return executeVerifyNewsletterEmail(args);
};

exports.default = verifyNewsletterEmail;
//# sourceMappingURL=verifyNewsletterEmail.js.map