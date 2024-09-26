import { bigIntToBytes, bytesToBigInt, hexToBytes } from "./enclave/utils";
import { p256 } from "@noble/curves/p256";
import { it } from "@jest/globals";

it("should successfully", async () => {
	console.log("test test");

	const rawSig =
		"3045022100aaf6aac922338b3a09ea2b69b8cc66b4ee8a198f5d65a323835083d62915faac0220029a579f7e0e9d60a07c673159c9dc22b9bfeb7aaa2d2758213c53036d5b0273";

	const sig = hexStringToByteArray("0x" + rawSig);
	console.log("sig: ", sig);
	const parsedDERSig = parseDERSignature(sig);
	console.log("parsedDERSig: ", parsedDERSig);
	const normalizedDERSigR = normalizeInteger(parsedDERSig.r);
	const normalizedDERSigS = normalizeInteger(parsedDERSig.r);
	console.log("normalizedDERSigR: ", normalizedDERSigR);
	console.log("normalizedDERSigS: ", normalizedDERSigS);
});

export function parseAndNormalizeSig(derSig: string): number[] {
	const parsedSignature = p256.Signature.fromDER(derSig);
	console.log("parsedSignature: ", parsedSignature);
	const bSig = hexToBytes(`0x${parsedSignature.toCompactHex()}`);
	// if (bSig.length !== 64) {
	// 	throw new Error("Invalid signature length");
	// }
	// assert(bSig.length === 64, "signature is not 64 bytes");
	const bR = bSig.slice(0, 32);
	const bS = bSig.slice(32);

	// Avoid malleability. Ensure low S (<= N/2 where N is the curve order)
	const r = bytesToBigInt(bR);
	let s = bytesToBigInt(bS);
	const n = BigInt(
		"0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551"
	);
	if (s > n / 2n) {
		s = n - s;
	}
	console.log("signature");
	console.log([...bigIntToBytes(r), ...bigIntToBytes(s)]);
	return [...bigIntToBytes(r), ...bigIntToBytes(s)];
}

function parseDERSignature(derSig: any) {
	let offset = 0;

	// Check if the first byte is 0x30 (SEQUENCE)
	if (derSig[offset++] !== 0x30) {
		throw new Error("Invalid signature format");
	}

	// Read the length of the sequence
	let seqLength = derSig[offset++];

	// Read the INTEGER tag for r
	if (derSig[offset++] !== 0x02) {
		throw new Error("Invalid signature format");
	}

	// Read the length of r
	let rLength = derSig[offset++];

	// Extract r
	let r = derSig.slice(offset, offset + rLength);
	offset += rLength;

	// Read the INTEGER tag for s
	if (derSig[offset++] !== 0x02) {
		throw new Error("Invalid signature format");
	}

	// Read the length of s
	let sLength = derSig[offset++];

	// Extract s
	let s = derSig.slice(offset, offset + sLength);

	return { r, s };
}

function hexStringToByteArray(hexString: string) {
	if (hexString.length % 2 !== 0) {
		throw "Invalid hex string";
	}
	var byteArray = new Uint8Array(hexString.length / 2);
	for (var i = 0; i < byteArray.length; i++) {
		byteArray[i] = parseInt(hexString.substr(2 * i, 2), 16);
	}
	return byteArray;
}

function normalizeInteger(integer: any) {
	// Remove leading zero if present
	if (integer[0] === 0x00) {
		integer = integer.slice(1);
	}
	// Pad with leading zeros if length is less than 32 bytes
	if (integer.length < 32) {
		let padded = new Uint8Array(32);
		padded.set(integer, 32 - integer.length);
		return padded;
	}
	return integer;
}
