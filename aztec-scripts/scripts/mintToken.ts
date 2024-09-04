import {
  AztecAddress,
  Fq,
  Fr,
  GrumpkinScalar,
  computeSecretHash,
  createPXEClient,
  deriveKeys,
  generatePublicKey
} from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js/Token';
import { getDeployedTestAccountsWallets } from '@aztec/accounts/testing';
import { addPendingShieldNoteToPXE } from './addPendingShields';

export const PXE_URL = 'http://localhost:8080';

// ts-node --experimentalSpecifierResolution=node ./scripts/mintToken.ts --max-old-space-size=16384

async function main(recipient: string) {
  const pxe = createPXEClient(PXE_URL);
  const wallet = (await getDeployedTestAccountsWallets(pxe))[0];

  const token = {
    address: '',
    name: 'Aztec Ethereum',
    symbol: 'aETH',
    decimal: 18
  };

  let tokenContract;
  try {
    tokenContract = await TokenContract.deploy(
      wallet,
      wallet.getAddress(),
      token.name,
      token.symbol,
      token.decimal
    )
      .send()
      .deployed();

    console.log('tokenContract: ', tokenContract.address);
    token.address = tokenContract.address.toString();

    console.log('token useFaucet: ', token);

    await tokenContract.methods
      .mint_public(AztecAddress.fromString(recipient), 1000n)
      .send()
      .wait();

    const secret = Fr.random();
    const secretHash = computeSecretHash(secret);

    const tx = await tokenContract.methods
      .mint_private(100n, secretHash)
      .send()
      .wait();

    await addPendingShieldNoteToPXE(
      wallet.getAddress().toString(),
      AztecAddress.fromString(token.address).toString(),
      100n,
      secretHash.toString(),
      tx.txHash.toString()
    );

    await tokenContract.methods
      .redeem_shield(wallet.getAddress(), 100n, secret)
      .send()
      .wait();

    const sendTx = await tokenContract.methods
      .transfer(
        wallet.getAddress(),
        AztecAddress.fromString(recipient),
        100n,
        0
      )
      .send()
      .wait();

    console.log('sendTx: ', sendTx);

    const privateBalance = await tokenContract.methods
      .balance_of_private(AztecAddress.fromString(recipient))
      .simulate();

    console.log('privateBalance: ', privateBalance);

    const publicBalance = await tokenContract.methods
      .balance_of_public(AztecAddress.fromString(recipient))
      .simulate();

    console.log('publicBalance: ', publicBalance);
  } catch (e) {
    console.log('e: ', e);
  }
}

main('0x14f7a3f6de857d54350353673d1a0f76afc35bd06e22079bc44a8c9fe61cf51e');
