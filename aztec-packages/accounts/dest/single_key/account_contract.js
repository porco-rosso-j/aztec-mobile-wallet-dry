"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleKeyAccountContract = void 0;
var _circuitTypes = require("@aztec/circuit-types");
var _barretenberg = require("@aztec/circuits.js/barretenberg");
var _account_contract = require("../defaults/account_contract.js");
var _artifact = require("./artifact.js");
/**
 * Account contract that authenticates transactions using Schnorr signatures verified against
 * the note encryption key, relying on a single private key for both encryption and authentication.
 */
class SingleKeyAccountContract extends _account_contract.DefaultAccountContract {
  constructor(encryptionPrivateKey) {
    super(_artifact.SchnorrSingleKeyAccountContractArtifact);
    this.encryptionPrivateKey = encryptionPrivateKey;
  }
  getDeploymentArgs() {
    return undefined;
  }
  getAuthWitnessProvider(account) {
    return new SingleKeyAuthWitnessProvider(this.encryptionPrivateKey, account);
  }
}
/**
 * Creates auth witnesses using Schnorr signatures and including the partial address and public key
 * in the witness, so verifiers do not need to store the public key and can instead validate it
 * by reconstructing the current address.
 */
exports.SingleKeyAccountContract = SingleKeyAccountContract;
class SingleKeyAuthWitnessProvider {
  constructor(privateKey, account) {
    this.privateKey = privateKey;
    this.account = account;
  }
  createAuthWit(messageHash) {
    const schnorr = new _barretenberg.Schnorr();
    const signature = schnorr.constructSignature(messageHash.toBuffer(), this.privateKey);
    const witness = [...this.account.publicKeys.toFields(), ...signature.toBuffer(), this.account.partialAddress];
    return Promise.resolve(new _circuitTypes.AuthWitness(messageHash, witness));
  }
}