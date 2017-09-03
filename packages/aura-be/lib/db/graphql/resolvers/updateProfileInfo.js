'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../../sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const executeUpdateProfileInfo = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* ({ nonce, info }) {
    try {
      let session = yield _db_connection2.default.Session.findOne({ where: { nonce } });
      if (!session) {
        return { err: true, response: 'Whoops! Something went wrong.' };
      }
      let user = yield session.getUser();
      if (!user) {
        return { err: true, response: 'Whoops! Something went wrong.' };
      }
      user.set(info);
      yield user.save();
      return { err: false, response: 'Success!' };
    } catch (err) {
      console.error(err);
      return { err: true, response: err.message };
    }
  });

  return function executeUpdateProfileInfo(_x) {
    return _ref.apply(this, arguments);
  };
})();

const updateProfileInfo = (_, args, context) => {
  console.log('updateProfileInfo');
  return executeUpdateProfileInfo(args);
};

exports.default = updateProfileInfo;
//# sourceMappingURL=updateProfileInfo.js.map