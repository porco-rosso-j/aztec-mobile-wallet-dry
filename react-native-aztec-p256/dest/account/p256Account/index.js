/**
 * The `@aztec/accounts/ecdsa` export provides an ECDSA account contract implementation, that uses an ECDSA private key for authentication, and a Grumpkin key for encryption.
 * Consider using this account type when working with integrations with Ethereum wallets.
 *
 * @packageDocumentation
 */
import { AccountManager } from '@aztec/aztec.js/account';
import { getWallet } from '@aztec/aztec.js/wallet';
import { EcdsaAccountContract } from './account_contract.js';
export { EcdsaAccountContractArtifact } from './artifact.js';
export { EcdsaAccountContract };
/**
 * Creates an Account that relies on an ECDSA signing key for authentication.
 * @param pxe - An PXE server instance.
 * @param secretKey - Secret key used to derive all the keystore keys.
 * @param publicKey - Secp256k1 key used for signing transactions.
 * @param salt - Deployment salt.
 */
export function getEcdsaAccount(pxe, secretKey, publicX, publicY, salt) {
    return new AccountManager(pxe, secretKey, new EcdsaAccountContract(publicX, publicY), salt);
}
/**
 * Gets a wallet for an already registered account using ECDSA signatures.
 * @param pxe - An PXE server instance.
 * @param address - Address for the account.
 * @param publicKey - ECDSA key used for signing transactions.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
export function getEcdsaWallet(pxe, address, publicX, publicY) {
    return getWallet(pxe, address, new EcdsaAccountContract(publicX, publicY));
}
//# sourceMappingURL=index.js.map