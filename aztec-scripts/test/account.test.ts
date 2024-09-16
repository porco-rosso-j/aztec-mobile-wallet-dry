import { jest, beforeAll, it, describe } from '@jest/globals';
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
  SignerlessWallet
} from '@aztec/aztec.js';
import { AztecAddress, Fq } from '@aztec/circuits.js';
import { Ecdsa } from '@aztec/circuits.js/barretenberg';
import { getDeployedTestAccountsWallets } from '@aztec/accounts/testing';
import { CounterContract, TokenContract } from '@aztec/noir-contracts.js';
import {
  SANDBOX_URL,
  TIMEOUT,
  realMessage,
  realPubkey,
  realSignature
} from './constants.js';
import { EcdsaAccountContract } from '../src/p256Account/account_contract.js';
import { EcdsaAccountContract as EcdsaAccountContractInstance } from '../src/EcdsaAccount.js';
import { mockP256Params } from './constants.js';
import { ethers } from 'ethers';
import { getEcdsaAccount, getEcdsaWallet } from '../src/p256Account/index.js';

// generate artifacts
// create p256 account
// deploy contract
// test signature verification with mock sig

export const ACCOUNT_ADDRESS =
  '0x0ad18d234f1867bdc7b2cac3ea675db5918cdabd5010775e8781280728df5dae';
const TOKEN_ADDRESS =
  '0x00c13f15e6e64dde086aa6c349e6aac63f5c77215ed6a8a3e1a29c3231c8bd03';

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
  // console.log('key: ', key);
  // const account = await getEcdsaAccount(
  //   pxe,
  //   key,
  //   Buffer.from(realPubkey.x),
  //   Buffer.from(realPubkey.y)
  // )
  //   .deploy()
  //   .wait();

  // console.log('account addr: ', account.wallet.getAddress());

  // // instantiate
  // p256AccountWallet = await getEcdsaWallet(
  //   pxe,
  //   account.wallet.getAddress(),
  //   Buffer.from(realPubkey.x),
  //   Buffer.from(realPubkey.y)
  // );

  // console.log('p256AccountWallet addr: ', p256AccountWallet.getAddress());

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

describe('E2E Batcher setup', () => {
  jest.setTimeout(TIMEOUT);
  it.skip('should successfully', async () => {
    console.log('test test');

    const accountInstance = await EcdsaAccountContractInstance.at(
      p256AccountWallet.getAddress(),
      p256AccountWallet
    );

    const returnValue = await accountInstance
      .withWallet(p256AccountWallet)
      .methods.test_verify_signature(
        hexToBytes(ethers.sha256(ethers.toUtf8Bytes(realMessage))),
        realSignature.full,
        realPubkey.x,
        realPubkey.y
      )
      .simulate();

    console.log('returnValue: ', returnValue);
  });

  it.skip('should successfully send tokens', async () => {
    console.log('test test');

    const tx = await tokenContract.methods
      .mint_public(AztecAddress.fromString(ACCOUNT_ADDRESS), 10)
      .send()
      .wait();
    console.log('tx: ', tx);
    console.log('tokenContract: ', tokenContract.address);
  });

  it('should successfully mint tokens', async () => {
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
    console.log('balance: ', balance);
  });
});

// docker run --rm -v $(pwd):/app -w /app aztecprotocol/aztec-builder:0.46.1 codegen target -o ../../src/

export function hexToBytes(hex: string): number[] {
  let formattedHex = hex;
  if (formattedHex.startsWith('0x')) {
    formattedHex = formattedHex.slice(2);
  }
  return formattedHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];
}
