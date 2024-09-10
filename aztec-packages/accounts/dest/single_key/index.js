"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SingleKeyAccountContract", {
  enumerable: true,
  get: function () {
    return _account_contract.SingleKeyAccountContract;
  }
});
Object.defineProperty(exports, "SingleKeyAccountContractArtifact", {
  enumerable: true,
  get: function () {
    return _artifact.SchnorrSingleKeyAccountContractArtifact;
  }
});
exports.getUnsafeSchnorrAccount = exports.getSingleKeyAccount = getSingleKeyAccount;
exports.getUnsafeSchnorrWallet = exports.getSingleKeyWallet = getSingleKeyWallet;
var _account = require("@aztec/aztec.js/account");
var _wallet = require("@aztec/aztec.js/wallet");
var _circuits = require("@aztec/circuits.js");
var _account_contract = require("./account_contract.js");
var _artifact = require("./artifact.js");
/**
 * The `@aztec/accounts/single_key` export provides a testing account contract implementation that uses a single Grumpkin key for both authentication and encryption.
 * It is not recommended to use this account type in production.
 *
 * @packageDocumentation
 */

/**
 * Creates an Account that uses the same Grumpkin key for encryption and authentication.
 * @param pxe - An PXE server instance.
 * @param secretKey - Secret key used to derive all the keystore keys (in this case also used to get signing key).
 * @param salt - Deployment salt.
 */
function getSingleKeyAccount(pxe, secretKey, salt) {
  const encryptionPrivateKey = (0, _circuits.deriveMasterIncomingViewingSecretKey)(secretKey);
  return new _account.AccountManager(pxe, secretKey, new _account_contract.SingleKeyAccountContract(encryptionPrivateKey), salt);
}
/**
 * Gets a wallet for an already registered account using Schnorr signatures with a single key for encryption and authentication.
 * @param pxe - An PXE server instance.
 * @param address - Address for the account.
 * @param signingPrivateKey - Grumpkin key used for note encryption and signing transactions.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
function getSingleKeyWallet(pxe, address, signingKey) {
  return (0, _wallet.getWallet)(pxe, address, new _account_contract.SingleKeyAccountContract(signingKey));
}