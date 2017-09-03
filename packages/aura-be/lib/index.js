'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lambdaHandler = exports.initHttpServer = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let authenticationHandler = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (req, res) {
    let googleSuccessCallback = (() => {
      var _ref2 = (0, _asyncToGenerator3.default)(function* (e, login) {
        console.log('googleSuccessCallback');
        if (e) {
          console.log(e);
          res.sendStatus(500);
          return;
        }
        let payload = login.getPayload();
        console.log((0, _stringify2.default)({
          payload,
          login
        }, null, 2));
        if (process.env.GSUITE_DOMAIN == payload['hd']) {
          const user = (yield _db_connection2.default.User.findOrCreate({ where: { email: payload['email'], token: payload['sub'] } }))[0];
          const dstroyed_sessions = yield _db_connection2.default.Session.destroy({ where: { userId: user.id } });
          const session = yield _db_connection2.default.Session.create({ nonce: generateNonceString(), userId: user.id });
          res.write(session.nonce);
          res.end();
          return;
        } else {
          res.sendStatus(401);
          return;
        }
      });

      return function googleSuccessCallback(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    })();

    authClient.verifyIdToken(req.headers['google-access-token'], process.env.GOOGLE_CLIENT_ID, googleSuccessCallback);
  });

  return function authenticationHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let initHttpServer = exports.initHttpServer = (() => {
  var _ref3 = (0, _asyncToGenerator3.default)(function* () {
    let db_success = yield db_sync_result;

    console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`);
    const server = qaApp.listen(process.env.LISTEN_PORT);
    return new _promise2.default(function (resolve, reject) {
      server.on('listening', function () {
        console.log(`DataQA API now listening on port ${process.env.LISTEN_PORT}`);
        resolve(server);
      });
      server.on('error', function (err) {
        return reject(err);
      });
    });
  });

  return function initHttpServer() {
    return _ref3.apply(this, arguments);
  };
})();

exports.initDB = initDB;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _awsServerlessExpress = require('aws-serverless-express');

var _awsServerlessExpress2 = _interopRequireDefault(_awsServerlessExpress);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _base_schema = require('./db/graphql/schema/base_schema');

var _base_schema2 = _interopRequireDefault(_base_schema);

var _combinedResolvers = require('./db/graphql/resolvers/combinedResolvers');

var _combinedResolvers2 = _interopRequireDefault(_combinedResolvers);

var _db_connection = require('./db/sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _googleAuthLibrary = require('google-auth-library');

var _googleAuthLibrary2 = _interopRequireDefault(_googleAuthLibrary);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _base64url = require('base64url');

var _base64url2 = _interopRequireDefault(_base64url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NODE_ENV = process.env.NODE_ENV;

(0, _config2.default)();

const qaApp = (0, _express2.default)();

const schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: _base_schema2.default, resolvers: _combinedResolvers2.default });

const authClient = new new _googleAuthLibrary2.default().OAuth2(process.env.GOOGLE_CLIENT_ID);

const generateNonceString = () => {
  return (0, _base64url2.default)(_crypto2.default.randomBytes(64));
};

qaApp.use((0, _cors2.default)());

qaApp.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(request => {
  const token = request.headers && request.headers.authorization && request.headers.authorization.split(' ')[1] || undefined;
  return {
    context: { token },
    schema
  };
}));

qaApp.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

qaApp.use('/auth', authenticationHandler);

const db_sync_result = initDB();

function initDB() {
  console.log('Initializing DB.');
  return _db_connection2.default.sequelize.sync().then(() => console.log('db initialized'));
}

const qaServer = _awsServerlessExpress2.default.createServer(qaApp);

const lambdaHandler = exports.lambdaHandler = (() => {
  var _ref4 = (0, _asyncToGenerator3.default)(function* (event, context) {
    yield db_sync_result;
    // console.log(`process.env keys: ${Object.keys(process.env)}`)
    console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`);
    return _awsServerlessExpress2.default.proxy(qaServer, event, context);
  });

  return function lambdaHandler(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
})();
//# sourceMappingURL=index.js.map