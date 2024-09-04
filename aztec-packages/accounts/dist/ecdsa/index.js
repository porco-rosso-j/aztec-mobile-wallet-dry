"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EcdsaAccountContract", {
  enumerable: true,
  get: function () {
    return _account_contract.EcdsaAccountContract;
  }
});
Object.defineProperty(exports, "EcdsaAccountContractArtifact", {
  enumerable: true,
  get: function () {
    return _artifact.EcdsaAccountContractArtifact;
  }
});
exports.getEcdsaAccount = getEcdsaAccount;
exports.getEcdsaWallet = getEcdsaWallet;
var _account = require("@aztec/aztec.js/account");
var _wallet = require("@aztec/aztec.js/wallet");
var _account_contract = require("./account_contract.js");
var _artifact = require("./artifact.js");
/**
 * The `@aztec/accounts/ecdsa` export provides an ECDSA account contract implementation, that uses an ECDSA private key for authentication, and a Grumpkin key for encryption.
 * Consider using this account type when working with integrations with Ethereum wallets.
 *
 * @packageDocumentation
 */

/**
 * Creates an Account that relies on an ECDSA signing key for authentication.
 * @param pxe - An PXE server instance.
 * @param secretKey - Secret key used to derive all the keystore keys.
 * @param signingPrivateKey - Secp256k1 key used for signing transactions.
 * @param salt - Deployment salt.
 */
function getEcdsaAccount(pxe, secretKey, signingPrivateKey, salt) {
  return new _account.AccountManager(pxe, secretKey, new _account_contract.EcdsaAccountContract(signingPrivateKey), salt);
}
/**
 * Gets a wallet for an already registered account using ECDSA signatures.
 * @param pxe - An PXE server instance.
 * @param address - Address for the account.
 * @param signingPrivateKey - ECDSA key used for signing transactions.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
function getEcdsaWallet(pxe, address, signingPrivateKey) {
  return (0, _wallet.getWallet)(pxe, address, new _account_contract.EcdsaAccountContract(signingPrivateKey));
}