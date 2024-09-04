"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchnorrAccountContract = void 0;
var _circuitTypes = require("@aztec/circuit-types");
var _barretenberg = require("@aztec/circuits.js/barretenberg");
var _account_contract = require("../defaults/account_contract.js");
var _artifact = require("./artifact.js");
/**
 * Account contract that authenticates transactions using Schnorr signatures
 * verified against a Grumpkin public key stored in an immutable encrypted note.
 */
class SchnorrAccountContract extends _account_contract.DefaultAccountContract {
  constructor(signingPrivateKey) {
    super(_artifact.SchnorrAccountContractArtifact);
    this.signingPrivateKey = signingPrivateKey;
  }
  getDeploymentArgs() {
    const signingPublicKey = new _barretenberg.Schnorr().computePublicKey(this.signingPrivateKey);
    return [signingPublicKey.x, signingPublicKey.y];
  }
  getAuthWitnessProvider(_address) {
    return new SchnorrAuthWitnessProvider(this.signingPrivateKey);
  }
}
/** Creates auth witnesses using Schnorr signatures. */
exports.SchnorrAccountContract = SchnorrAccountContract;
class SchnorrAuthWitnessProvider {
  constructor(signingPrivateKey) {
    this.signingPrivateKey = signingPrivateKey;
  }
  createAuthWit(messageHash) {
    const schnorr = new _barretenberg.Schnorr();
    const signature = schnorr.constructSignature(messageHash.toBuffer(), this.signingPrivateKey).toBuffer();
    return Promise.resolve(new _circuitTypes.AuthWitness(messageHash, [...signature]));
  }
}