import { Buffer } from 'buffer';
export function formatProof(proof) {
    const length = proof.length;
    return `${proof.substring(0, 100)}...${proof.substring(length - 100, length)}`;
}
export function formatAddress(address, long = false) {
    if (long) {
        return `${address.substring(0, 12)}...${address.substring(32, 42)}`;
    }
    return `${address.substring(0, 6)}...${address.substring(38, 42)}`;
}
export function stringToBytes(str) {
    return Buffer.from(str).toJSON().data;
}
export function hexToBytes(hex) {
    let formattedHex = hex;
    if (formattedHex.startsWith('0x')) {
        formattedHex = formattedHex.slice(2);
    }
    return formattedHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];
}
export function base64ToBytes(base64) {
    return Array.from(Buffer.from(base64, 'base64'));
}
export function bytesToHex(bytes) {
    return bytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
export function reverseArray(arr) {
    return arr.slice().reverse();
}
export function base64ToHex(base64) {
    return bytesToHex(base64ToBytes(base64));
}
export function bytesToBigInt(bytes) {
    return BigInt(`0x${bytes.map(b => b.toString(16).padStart(2, '0')).join('')}`);
}
export function bigIntToBytes(int) {
    const hex = int.toString(16);
    return hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];
}
//# sourceMappingURL=utils.js.map