'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let configuredClient = new _twilio2.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sendMessage = (body, to) => {
  return configuredClient.messages.create({
    body,
    to,
    from: `${process.env.TWILIO_PHONE_NUMBER}`
  });
};

const txtMessageClient = { sendMessage };

exports.default = txtMessageClient;
//# sourceMappingURL=txt_message_client.js.map