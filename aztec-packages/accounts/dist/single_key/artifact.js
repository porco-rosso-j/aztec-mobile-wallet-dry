"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchnorrSingleKeyAccountContractArtifact = void 0;
var _aztec = require("@aztec/aztec.js");
var _SchnorrSingleKeyAccount = _interopRequireDefault(require("../artifacts/SchnorrSingleKeyAccount.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SchnorrSingleKeyAccountContractArtifact = exports.SchnorrSingleKeyAccountContractArtifact = (0, _aztec.loadContractArtifact)(_SchnorrSingleKeyAccount.default);