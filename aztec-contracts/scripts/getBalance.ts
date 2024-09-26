import {
	AztecAddress,
	createPXEClient,
	SignerlessWallet,
} from "@aztec/aztec.js";
import { TokenContract } from "@aztec/noir-contracts.js/Token";
import { getDeployedTestAccountsWallets } from "@aztec/accounts/testing";
import { DefaultEntrypoint } from "@aztec/aztec.js/entrypoint";

export const PXE_URL = "http://localhost:8080";

// ts-node --experimentalSpecifierResolution=node ./scripts/getBalance.ts deloyToken --max-old-space-size=16384

async function getBalance(token: string, recipient: string) {
	const pxe = createPXEClient(PXE_URL);
	const wallet = (await getDeployedTestAccountsWallets(pxe))[0];

	// const { chainId, protocolVersion } = await pxe.getNodeInfo();
	// const entrypoint = new DefaultEntrypoint(chainId, protocolVersion);
	const tokenContract = await TokenContract.at(
		AztecAddress.fromString(token),
		wallet
	);

	const balance = await tokenContract.methods
		.balance_of_public(AztecAddress.fromString(recipient))
		.simulate();
	console.log("balance: ", balance);
}

getBalance(
	"0x179ed9f33696fe58212183b9b3363cf38177f9382e9f7c9e1c785801fac3dbfd",
	"0x09a8045c20e543047657ad43b8de0dee5f0095a81299d84661353ca444cd7a0f"
);
