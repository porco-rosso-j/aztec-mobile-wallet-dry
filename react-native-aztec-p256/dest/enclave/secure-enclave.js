import { NativeModules } from 'react-native';
import { bigIntToBytes, bytesToBigInt, hexToBytes } from './index.js';
import { p256 } from '@noble/curves/p256';
import { ethers } from 'ethers';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const LINKING_ERROR = 'Enclave Module is not linked';
const SecureEnclave = NativeModules.SecureEnclaveModule
    ? NativeModules.SecureEnclaveModule
    : new Proxy({}, {
        get() {
            throw new Error(LINKING_ERROR);
        }
    });
const ALIAS = 'mainkey';
const derPrefix = '3059301306072a8648ce3d020106082a8648ce3d03010703420004';
export function isDERPubKey(pubKeyHex) {
    return (pubKeyHex.startsWith(derPrefix) &&
        pubKeyHex.length === derPrefix.length + 128);
}
export function formatPublicKey(pubKeyHex) {
    console.log(pubKeyHex);
    if (!isDERPubKey(pubKeyHex)) {
        throw new Error('Invalid public key format');
    }
    const pubKey = pubKeyHex.substring(derPrefix.length);
    if (pubKey.length !== 128) {
        throw new Error('Invalid public key length');
    }
    const key1 = `0x${pubKey.substring(0, 64)}`;
    const key2 = `0x${pubKey.substring(64)}`;
    return { x: hexToBytes(key1), y: hexToBytes(key2) };
}
export function parseAndNormalizeSig(derSig) {
    const parsedSignature = p256.Signature.fromDER(derSig);
    const bSig = hexToBytes(`0x${parsedSignature.toCompactHex()}`);
    if (bSig.length !== 64) {
        throw new Error('Invalid signature length');
    }
    const bR = bSig.slice(0, 32);
    const bS = bSig.slice(32);
    // Avoid malleability. Ensure low S (<= N/2 where N is the curve order)
    const r = bytesToBigInt(bR);
    let s = bytesToBigInt(bS);
    const n = BigInt('0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551');
    if (s > n / 2n) {
        s = n - s;
    }
    console.log('signature');
    console.log([...bigIntToBytes(r), ...bigIntToBytes(s)]);
    return [...bigIntToBytes(r), ...bigIntToBytes(s)];
}
// export async function checkHasKey(): Promise<boolean> {
//   return (await AsyncStorage.getItem('publicKey')) !== null;
// }
export async function getPublicKey() {
    const { publicKey } = await SecureEnclave.fetchPublicKey(ALIAS);
    return formatPublicKey(publicKey);
}
export async function generateKeyPair() {
    const { publicKey } = await SecureEnclave.createKeyPair(ALIAS);
    console.log('publicKey unformed: ', publicKey);
    return formatPublicKey(publicKey);
}
export async function deleteKeyPair() {
    return await SecureEnclave.deleteKeyPair(ALIAS);
}
export async function signMessage(data) {
    const { signature } = await SecureEnclave.sign(ALIAS, data);
    console.log(signature);
    return parseAndNormalizeSig(signature);
}
export async function parseMessage(data) {
    return hexToBytes(ethers.sha256(ethers.toUtf8Bytes(data)));
}
//# sourceMappingURL=secure-enclave.js.map