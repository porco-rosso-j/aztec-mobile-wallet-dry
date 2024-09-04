"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultAccountInterface = void 0;
var _circuits = require("@aztec/circuits.js");
var _account = require("@aztec/entrypoints/account");
/**
 * Default implementation for an account interface. Requires that the account uses the default
 * entrypoint signature, which accept an AppPayload and a FeePayload as defined in noir-libs/aztec-noir/src/entrypoint module
 */
class DefaultAccountInterface {
  constructor(authWitnessProvider, address, nodeInfo) {
    this.authWitnessProvider = authWitnessProvider;
    this.address = address;
    this.entrypoint = new _account.DefaultAccountEntrypoint(address.address, authWitnessProvider, nodeInfo.chainId, nodeInfo.protocolVersion);
    this.chainId = new _circuits.Fr(nodeInfo.chainId);
    this.version = new _circuits.Fr(nodeInfo.protocolVersion);
  }
  createTxExecutionRequest(execution) {
    return this.entrypoint.createTxExecutionRequest(execution);
  }
  createAuthWit(messageHash) {
    return this.authWitnessProvider.createAuthWit(messageHash);
  }
  getCompleteAddress() {
    return this.address;
  }
  getAddress() {
    return this.address.address;
  }
  getChainId() {
    return this.chainId;
  }
  getVersion() {
    return this.version;
  }
}
exports.DefaultAccountInterface = DefaultAccountInterface;