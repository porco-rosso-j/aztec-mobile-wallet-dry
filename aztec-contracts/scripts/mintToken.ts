import { AztecAddress, createPXEClient } from "@aztec/aztec.js";
import { TokenContract } from "@aztec/noir-contracts.js/Token";
import { getDeployedTestAccountsWallets } from "@aztec/accounts/testing";

export const PXE_URL = "http://localhost:8080";

// ts-node --experimentalSpecifierResolution=node ./scripts/mintToken.ts deloyToken --max-old-space-size=16384

async function mintToken(token: string, recipient: string) {
	const pxe = createPXEClient(PXE_URL);
	const wallet = (await getDeployedTestAccountsWallets(pxe))[0];

	const tokenContract = await TokenContract.at(
		AztecAddress.fromString(token),
		wallet
	);

	await tokenContract.methods
		.mint_public(AztecAddress.fromString(recipient), 10n)
		.send()
		.wait();
}

mintToken(
	"0x0277e80163a459d9f07734f0ee03d1faea0c45ace3f2d6a0e615a22b56c6da42",
	"0x2c8545d08df6a1c03d77ddc90f128c006e45f55dfd4b0fe45c200216cd303c16"
);

// 0x2c014dd1a9676bdeda6e3b4b3bfc8b511c23b39fb423ac3dfdce609a69ab40be

/*

thread 'main' panicked at src/transpile.rs:874:14:
Transpiler doesn't know how to process EcdsaSecp256r1 { hashed_msg: HeapVector { pointer: MemoryAddress(4), size: MemoryAddress(14) }, public_key_x: HeapArray { pointer: MemoryAddress(8), size: 32 }, public_key_y: HeapArray { pointer: MemoryAddress(10), size: 32 }, signature: HeapArray { pointer: MemoryAddress(6), size: 64 }, result: MemoryAddress(3) }

*/
