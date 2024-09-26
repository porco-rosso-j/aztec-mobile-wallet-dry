import { createPXEClient } from "@aztec/aztec.js";
import { TokenContract } from "@aztec/noir-contracts.js/Token";
import { getDeployedTestAccountsWallets } from "@aztec/accounts/testing";

export const PXE_URL = "http://localhost:8080";

// ts-node --experimentalSpecifierResolution=node ./scripts/deployToken.ts --max-old-space-size=16384

async function deloyToken() {
	const pxe = createPXEClient(PXE_URL);
	const wallet = (await getDeployedTestAccountsWallets(pxe))[0];

	const token = {
		address: "",
		name: "Ethereum",
		symbol: "ETH",
		decimal: 18,
	};

	const asa = TokenContract.deploy(
		wallet,
		wallet.getAddress(),
		token.name,
		token.symbol,
		token.decimal
	);

	try {
		const tokenContract = await TokenContract.deploy(
			wallet,
			wallet.getAddress(),
			token.name,
			token.symbol,
			token.decimal
		)
			.send()
			.deployed();

		console.log("tokenContract: ", tokenContract.address);
		token.address = tokenContract.address.toString();
	} catch (e) {
		console.log("e: ", e);
	}
}

deloyToken();
