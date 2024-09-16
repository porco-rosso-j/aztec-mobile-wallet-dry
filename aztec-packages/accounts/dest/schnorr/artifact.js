"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchnorrAccountContractArtifact = void 0;
var _aztec = require("@aztec/aztec.js");
var _SchnorrAccount = _interopRequireDefault(require("../artifacts/SchnorrAccount.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//

const SchnorrAccountContractArtifact = exports.SchnorrAccountContractArtifact = (0, _aztec.loadContractArtifact)(_SchnorrAccount.default);