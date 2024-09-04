"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EcdsaAccountContract = void 0;
var _circuitTypes = require("@aztec/circuit-types");
var _barretenberg = require("@aztec/circuits.js/barretenberg");
var _account_contract = require("../defaults/account_contract.js");
var _artifact = require("./artifact.js");
/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 */
class EcdsaAccountContract extends _account_contract.DefaultAccountContract {
  constructor(signingPrivateKey) {
    super(_artifact.EcdsaAccountContractArtifact);
    this.signingPrivateKey = signingPrivateKey;
  }
  getDeploymentArgs() {
    const signingPublicKey = new _barretenberg.Ecdsa().computePublicKey(this.signingPrivateKey);
    return [signingPublicKey.subarray(0, 32), signingPublicKey.subarray(32, 64)];
  }
  getAuthWitnessProvider(_address) {
    return new EcdsaAuthWitnessProvider(this.signingPrivateKey);
  }
}
/** Creates auth witnesses using ECDSA signatures. */
exports.EcdsaAccountContract = EcdsaAccountContract;
class EcdsaAuthWitnessProvider {
  constructor(signingPrivateKey) {
    this.signingPrivateKey = signingPrivateKey;
  }
  createAuthWit(messageHash) {
    const ecdsa = new _barretenberg.Ecdsa();
    const signature = ecdsa.constructSignature(messageHash.toBuffer(), this.signingPrivateKey);
    return Promise.resolve(new _circuitTypes.AuthWitness(messageHash, [...signature.r, ...signature.s]));
  }
}