"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SchnorrAccountContract", {
  enumerable: true,
  get: function () {
    return _account_contract.SchnorrAccountContract;
  }
});
Object.defineProperty(exports, "SchnorrAccountContractArtifact", {
  enumerable: true,
  get: function () {
    return _artifact.SchnorrAccountContractArtifact;
  }
});
exports.getSchnorrAccount = getSchnorrAccount;
exports.getSchnorrWallet = getSchnorrWallet;
var _account = require("@aztec/aztec.js/account");
var _wallet = require("@aztec/aztec.js/wallet");
var _account_contract = require("./account_contract.js");
var _artifact = require("./artifact.js");
/**
 * The `@aztec/accounts/schnorr` export provides an account contract implementation that uses Schnorr signatures with a Grumpkin key for authentication, and a separate Grumpkin key for encryption.
 * This is the suggested account contract type for most use cases within Aztec.
 *
 * @packageDocumentation
 */

/**
 * Creates an Account Manager that relies on a Grumpkin signing key for authentication.
 * @param pxe - An PXE server instance.
 * @param secretKey - Secret key used to derive all the keystore keys.
 * @param signingPrivateKey - Grumpkin key used for signing transactions.
 * @param salt - Deployment salt.
 */
function getSchnorrAccount(pxe, secretKey, signingPrivateKey, salt) {
  return new _account.AccountManager(pxe, secretKey, new _account_contract.SchnorrAccountContract(signingPrivateKey), salt);
}
/**
 * Gets a wallet for an already registered account using Schnorr signatures.
 * @param pxe - An PXE server instance.
 * @param address - Address for the account.
 * @param signingPrivateKey - Grumpkin key used for signing transactions.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
function getSchnorrWallet(pxe, address, signingPrivateKey) {
  return (0, _wallet.getWallet)(pxe, address, new _account_contract.SchnorrAccountContract(signingPrivateKey));
}