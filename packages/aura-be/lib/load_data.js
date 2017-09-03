'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let listObjects = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* () {
    return yield s3.listObjects({ Bucket: process.env.S3_BUCKET_NAME, Prefix: "datasets/cleaned.data/" }).promise();
  });

  return function listObjects() {
    return _ref.apply(this, arguments);
  };
})();

let importData = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (objectList) {
    try {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(objectList.Contents), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          let obj = _step.value;

          let data = yield s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: obj.Key }).promise();
          console.log(obj.Key);
          let body = data.Body;
          let dataLines = body.toString().split('\n');
          dataLines.pop();
          let jsonLines = dataLines.map(function (row) {
            return JSON.parse(row.trim());
          });
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)(jsonLines), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              let line = _step2.value;

              try {
                yield _db_connection2.default.Site.upsert({ url: line['api_url'], quantcast_rank: 0 });
              } catch (err) {
                console.log(err);
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
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
    } catch (err) {
      console.log(err);
    }
  });

  return function importData(_x) {
    return _ref2.apply(this, arguments);
  };
})();

exports.runImport = runImport;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _db_connection = require('./db/sequelize/models/db_connection');

var _db_connection2 = _interopRequireDefault(_db_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _config2.default)();

class FailedImport extends Error {
  constructor(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
  }
}

var s3 = new _awsSdk2.default.S3();

function runImport() {
  listObjects().then(objects => {
    importData(objects).then(() => console.log('Finished.')).catch(err => console.error(err));
  }).catch(err => {
    console.error(err);
  });
}
//# sourceMappingURL=load_data.js.map