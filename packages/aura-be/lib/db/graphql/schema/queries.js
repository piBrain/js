"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = () => [`type Query {
      getSecurityQuestions( email: String!, nonce: String! ): JSON
      returnProfileInfo( nonce: String! ): JSON
      getTeams( nonce: String! ): JSON
    }`];
//# sourceMappingURL=queries.js.map