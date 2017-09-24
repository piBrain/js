'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _graphql = require('graphql');

var graphql = _interopRequireWildcard(_graphql);

var _apolloLocalQuery = require('apollo-local-query');

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuraGqlClient extends _apolloClient2.default {
  constructor({ options, schema, uri }) {
    if (!schema && !uri) {
      throw 'AuraGqlClient requires either a uri or grqphql schema';
    }
    const isLocalClient = schema && !uri;
    let networkInterface;

    if (isLocalClient) {
      networkInterface = (0, _apolloLocalQuery.createLocalInterface)(graphql, schema);
    } else {
      networkInterface = (0, _apolloClient.createNetworkInterface)({ uri });
    }

    options = _extends({}, options, { networkInterface });

    super(options);
  }
}

exports.default = AuraGqlClient;
