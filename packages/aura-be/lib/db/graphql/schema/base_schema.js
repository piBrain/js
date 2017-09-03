'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutations = require('./mutations');

var _mutations2 = _interopRequireDefault(_mutations);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseSchema = () => [`
  scalar JSON
  scalar DateTime

  schema {
    query: Query,
    mutation: Mutation, }
`];

exports.default = [baseSchema, _mutations2.default, _queries2.default];
//# sourceMappingURL=base_schema.js.map