"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EcdsaAccountContractArtifact = void 0;
var _aztec = require("@aztec/aztec.js");
var _EcdsaAccount = _interopRequireDefault(require("../artifacts/EcdsaAccount.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EcdsaAccountContractArtifact = exports.EcdsaAccountContractArtifact = (0, _aztec.loadContractArtifact)(_EcdsaAccount.default);