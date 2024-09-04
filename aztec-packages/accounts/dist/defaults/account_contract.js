"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultAccountContract = void 0;
var _account_interface = require("../defaults/account_interface.js");
/**
 * Base class for implementing an account contract. Requires that the account uses the
 * default entrypoint method signature.
 */
class DefaultAccountContract {
  constructor(artifact) {
    this.artifact = artifact;
  }
  getContractArtifact() {
    return this.artifact;
  }
  getInterface(address, nodeInfo) {
    return new _account_interface.DefaultAccountInterface(this.getAuthWitnessProvider(address), address, nodeInfo);
  }
}
exports.DefaultAccountContract = DefaultAccountContract;