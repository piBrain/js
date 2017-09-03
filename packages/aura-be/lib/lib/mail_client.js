'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailClient = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _sendgrid = require('sendgrid');

var _sendgrid2 = _interopRequireDefault(_sendgrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let configuredClient = (0, _sendgrid2.default)(process.env.SENDGRID_API_KEY);

const createMail = ({ from, to, subject, content, customArgs }, html = false) => {
  let mailFrom = new _sendgrid.mail.Email(from);
  let mailTo = new _sendgrid.mail.Email(to);
  let type = html == false ? 'text/plain' : 'text/html';
  let mailContent = new _sendgrid.mail.Content(type, content);
  let mailObject = new _sendgrid.mail.Mail(mailFrom, subject, mailTo, mailContent);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(customArgs)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      let key = _step.value;

      mailObject.addCustomArg(new _sendgrid.mail.CustomArgs(key, customArgs[key]));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return mailObject;
};

const sendMail = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (response, { to, subject, content, type, from } = { from: 'aura@pibrain.io' }) {
    try {
      const sent = yield send(createMail({
        from,
        to,
        subject,
        content,
        customArgs: { type }
      }, true));
      return { err: false, response };
    } catch (err) {
      console.error(err);
      console.error(err.message, err.response.status, err.response.body, err.response.headers);
      return { err: true, response: err.message };
    }
  });

  return function sendMail(_x) {
    return _ref.apply(this, arguments);
  };
})();

const addNewContact = (fields, listId = null) => {
  let request = configuredClient.emptyRequest({
    method: 'POST',
    path: '/v3/contactdb/recipients',
    body: [fields]
  });

  return configuredClient.API(request).then((() => {
    var _ref2 = (0, _asyncToGenerator3.default)(function* (response) {
      if (listId == null) {
        return;
      };
      if (response.body.error_count > 0) {
        throw response.body.errors;
      }
      let contactId = response.body.persisted_recipients[0];
      let request = configuredClient.emptyRequest({
        method: 'POST',
        path: '/v3/contactdb/lists/' + listId + '/recipients/' + contactId,
        body: [fields]
      });

      try {
        return yield configuredClient.API(request);
      } catch (err) {
        console.error(err);
      }
    });

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  })());
};

const send = mail => {
  let request = configuredClient.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  return configuredClient.API(request);
};

const mailClient = exports.mailClient = { createMail, sendMail, addNewContact };
//# sourceMappingURL=mail_client.js.map