import { jest, beforeAll, it, describe } from "@jest/globals";
import {
	Fr,
	PXE,
	createPXEClient,
	initAztecJs,
	AccountWalletWithSecretKey,
	Schnorr,
	TxStatus,
	AccountManager,
	Wallet,
	AccountWallet,
	SignerlessWallet,
	generatePublicKey,
} from "@aztec/aztec.js";
import {
	AztecAddress,
	CompleteAddress,
	deriveKeys,
	Fq,
} from "@aztec/circuits.js";
import { Ecdsa } from "@aztec/circuits.js/barretenberg";
import { getDeployedTestAccountsWallets } from "@aztec/accounts/testing";
import { CounterContract, TokenContract } from "@aztec/noir-contracts.js";
import {
	SANDBOX_URL,
	TIMEOUT,
	realMessage,
	realPubkey,
	realSignature,
} from "./constants.js";
import { EcdsaAccountContract } from "./p256Account/account_contract.js";
import { EcdsaAccountContract as EcdsaAccountContractInstance } from "./EcdsaAccount.js";
import { mockP256Params } from "./constants.js";
import { ethers } from "ethers";
import { getEcdsaAccount, getEcdsaWallet } from "./p256Account/index.js";

// generate artifacts
// create p256 account
// deploy contract
// test signature verification with mock sig

export const ACCOUNT_ADDRESS =
	"0x0ad18d234f1867bdc7b2cac3ea675db5918cdabd5010775e8781280728df5dae";
const TOKEN_ADDRESS =
	"0x00c13f15e6e64dde086aa6c349e6aac63f5c77215ed6a8a3e1a29c3231c8bd03";

// deploy: 0x2c014dd1a9676bdeda6e3b4b3bfc8b511c23b39fb423ac3dfdce609a69ab40be

let pxe: PXE;
let deployer: AccountWalletWithSecretKey;
let p256AccountWallet: AccountWallet;
let tokenContract: TokenContract;

beforeAll(async () => {
	pxe = createPXEClient(SANDBOX_URL);

	await initAztecJs();
	deployer = (await getDeployedTestAccountsWallets(pxe))[0];

	// const key = Fr.random();
	// console.log("key: ", key);
	// const account = await getEcdsaAccount(
	// 	pxe,
	// 	key,
	// 	Buffer.from(realPubkey.x),
	// 	Buffer.from(realPubkey.y)
	// )
	// 	.deploy()
	// 	.wait();

	// console.log("account addr: ", account.wallet.getAddress());

	// instantiate
	p256AccountWallet = await getEcdsaWallet(
		pxe,
		//account.wallet.getAddress(),
		AztecAddress.fromString(
			"0x292726398179925d4954246958f75d0fc05df4bde0de3de6ec891a2152a74312"
		),
		Buffer.from(realPubkey.x),
		Buffer.from(realPubkey.y)
	);

	console.log("p256AccountWallet addr: ", p256AccountWallet.getAddress());

	// tokenContract = await TokenContract.deploy(
	//   deployer,
	//   deployer.getAddress(),
	//   'DRY Token',
	//   'DRY',
	//   18n
	// )
	//   .send()
	//   .deployed();
});

describe("E2E Batcher setup", () => {
	jest.setTimeout(TIMEOUT);
	it("should successfully", async () => {
		console.log("test test");

		// const msg =
		// 	"0x100d68287a5b1d9b7c415e1ed2628b9beb95be648d06567e09be8c36054356ef";
		const msg =
			"0x2132792f241228a20425bd2a6f9bc0c72907b7aaa9c3c535d757d225ef3b1c6a";
		const msgBytes = hexToBytes(msg);
		const msgBytesU8Array = new Uint8Array(msgBytes);
		console.log("sliced msg: ", msg.slice(2));

		// const nonSlicedBytesMsg = ethers.toUtf8Bytes(msg);
		// console.log("non sliced bytesMsg: ", nonSlicedBytesMsg);

		// const bytesMsg = ethers.toUtf8Bytes(msg.slice(2));
		// console.log("bytesMsg: ", bytesMsg);

		const nonUtfMsg = new Uint8Array(hexToBytes(msg));
		console.log("nonUtfMsg: ", nonUtfMsg);

		const sha256Msg = ethers.sha256(nonUtfMsg);
		console.log("sha256Msg: ", sha256Msg);
		console.log("bytes sha256Msg: ", hexToBytes(sha256Msg));

		console.log("mmsgBytessg: ", msgBytes);
		const sig = [
			176, 124, 181, 75, 4, 251, 147, 212, 19, 104, 151, 152, 56, 2, 169, 156,
			27, 120, 84, 160, 80, 31, 170, 90, 202, 14, 240, 17, 252, 200, 94, 13, 28,
			221, 67, 47, 164, 211, 116, 234, 21, 89, 180, 47, 127, 141, 117, 207, 99,
			113, 48, 178, 143, 238, 71, 158, 51, 39, 142, 254, 180, 188, 217, 192,
		];
		console.log("sig: ", sig.length);

		const accountInstance = await EcdsaAccountContractInstance.at(
			//p256AccountWallet.getAddress(),
			AztecAddress.fromString(
				"0x292726398179925d4954246958f75d0fc05df4bde0de3de6ec891a2152a74312"
			),
			p256AccountWallet
		);

		// const hashedMsgBytes = hexToBytes(ethers.sha256(msgBytes));
		// console.log("hashedMsgBytes: ", hashedMsgBytes);

		const returnValue = await accountInstance
			.withWallet(p256AccountWallet)
			.methods.test_verify_signature(
				//hexToBytes(ethers.sha256(ethers.toUtf8Bytes(msg))),
				// hashedMsgBytes,
				// msgBytes,
				hexToBytes(sha256Msg),
				sig,
				realPubkey.x,
				realPubkey.y
			)
			.simulate();

		console.log("returnValue: ", returnValue);
	});

	it.skip("should successfully send tokens", async () => {
		console.log("test test");

		const tx = await tokenContract.methods
			.mint_public(AztecAddress.fromString(ACCOUNT_ADDRESS), 10)
			.send()
			.wait();
		console.log("tx: ", tx);
		console.log("tokenContract: ", tokenContract.address);
	});

	it.skip("should successfully mint tokens", async () => {
		const ecdsaContract = await getEcdsaWallet(
			pxe,
			AztecAddress.fromString(ACCOUNT_ADDRESS),
			Buffer.from(realPubkey.x),
			Buffer.from(realPubkey.y)
		);

		const token = await TokenContract.at(
			AztecAddress.fromString(TOKEN_ADDRESS),
			ecdsaContract
		);

		const balance = await token.methods
			.balance_of_public(AztecAddress.fromString(ACCOUNT_ADDRESS))
			.simulate();
		console.log("balance: ", balance);
	});
});

// docker run --rm -v $(pwd):/app -w /app aztecprotocol/aztec-builder:0.46.1 codegen target -o ../../src/

export function hexToBytes(hex: string): number[] {
	let formattedHex = hex;
	if (formattedHex.startsWith("0x")) {
		formattedHex = formattedHex.slice(2);
	}
	return formattedHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [];
}
