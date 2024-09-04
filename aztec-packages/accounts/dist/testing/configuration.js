"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_TEST_SIGNING_KEYS = exports.INITIAL_TEST_SECRET_KEYS = exports.INITIAL_TEST_ENCRYPTION_KEYS = exports.INITIAL_TEST_ACCOUNT_SALTS = void 0;
exports.deployInitialTestAccounts = deployInitialTestAccounts;
exports.getDeployedTestAccountsWallets = getDeployedTestAccountsWallets;
exports.getInitialTestAccountsWallets = getInitialTestAccountsWallets;
var _aztec = require("@aztec/aztec.js");
var _keys = require("@aztec/circuits.js/keys");
var _fields = require("@aztec/foundation/fields");
var _index = require("../schnorr/index.js");
const INITIAL_TEST_SECRET_KEYS = exports.INITIAL_TEST_SECRET_KEYS = [_fields.Fr.fromString('2153536ff6628eee01cf4024889ff977a18d9fa61d0e414422f7681cf085c281'), _fields.Fr.fromString('aebd1b4be76efa44f5ee655c20bf9ea60f7ae44b9a7fd1fd9f189c7a0b0cdae'), _fields.Fr.fromString('0f6addf0da06c33293df974a565b03d1ab096090d907d98055a8b7f4954e120c')];
const INITIAL_TEST_ENCRYPTION_KEYS = exports.INITIAL_TEST_ENCRYPTION_KEYS = INITIAL_TEST_SECRET_KEYS.map(secretKey => (0, _keys.deriveMasterIncomingViewingSecretKey)(secretKey));
// TODO(#5837): come up with a standard signing key derivation scheme instead of using ivsk_m as signing keys here
const INITIAL_TEST_SIGNING_KEYS = exports.INITIAL_TEST_SIGNING_KEYS = INITIAL_TEST_ENCRYPTION_KEYS;
const INITIAL_TEST_ACCOUNT_SALTS = exports.INITIAL_TEST_ACCOUNT_SALTS = [_fields.Fr.ZERO, _fields.Fr.ZERO, _fields.Fr.ZERO];
/**
 * Gets a collection of wallets for the Aztec accounts that are initially stored in the test environment.
 * @param pxe - PXE instance.
 * @returns A set of AccountWallet implementations for each of the initial accounts.
 */
function getInitialTestAccountsWallets(pxe) {
  return Promise.all(INITIAL_TEST_SECRET_KEYS.map((encryptionKey, i) => (0, _index.getSchnorrAccount)(pxe, encryptionKey, INITIAL_TEST_SIGNING_KEYS[i], INITIAL_TEST_ACCOUNT_SALTS[i]).getWallet()));
}
/**
 * Queries a PXE for it's registered accounts and returns wallets for those accounts using keys in the initial test accounts.
 * @param pxe - PXE instance.
 * @returns A set of AccountWallet implementations for each of the initial accounts.
 */
async function getDeployedTestAccountsWallets(pxe) {
  const registeredAccounts = await pxe.getRegisteredAccounts();
  return Promise.all(INITIAL_TEST_SECRET_KEYS.filter(initialSecretKey => {
    const initialEncryptionKey = (0, _keys.deriveMasterIncomingViewingSecretKey)(initialSecretKey);
    const publicKey = (0, _aztec.generatePublicKey)(initialEncryptionKey);
    return registeredAccounts.find(registered => registered.publicKeys.masterIncomingViewingPublicKey.equals(publicKey)) != undefined;
  }).map(secretKey => {
    const signingKey = (0, _keys.deriveSigningKey)(secretKey);
    // TODO(#5726): use actual salt here instead of hardcoding Fr.ZERO
    return (0, _index.getSchnorrAccount)(pxe, secretKey, signingKey, _fields.Fr.ZERO).getWallet();
  }));
}
/**
 * Deploys the initial set of schnorr signature accounts to the test environment
 * @param pxe - PXE instance.
 * @returns The set of deployed Account objects and associated private encryption keys
 */
async function deployInitialTestAccounts(pxe) {
  const accounts = INITIAL_TEST_SECRET_KEYS.map((secretKey, i) => {
    const account = (0, _index.getSchnorrAccount)(pxe, secretKey, INITIAL_TEST_SIGNING_KEYS[i], INITIAL_TEST_ACCOUNT_SALTS[i]);
    return {
      account,
      secretKey
    };
  });
  // Attempt to get as much parallelism as possible
  const deployMethods = await Promise.all(accounts.map(async x => {
    const deployMethod = await x.account.getDeployMethod();
    await deployMethod.create({
      contractAddressSalt: x.account.salt,
      skipClassRegistration: true,
      skipPublicDeployment: true,
      universalDeploy: true
    });
    await deployMethod.prove({});
    return deployMethod;
  }));
  // Send tx together to try and get them in the same rollup
  const sentTxs = deployMethods.map(dm => {
    return dm.send();
  });
  await Promise.all(sentTxs.map(async (tx, i) => {
    const wallet = await accounts[i].account.getWallet();
    return tx.wait({
      wallet
    });
  }));
  return accounts;
}