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
  AccountWallet
} from '@aztec/aztec.js';
import { Fq } from '@aztec/circuits.js';
import { Ecdsa } from '@aztec/circuits.js/barretenberg';
import { getDeployedTestAccountsWallets } from '@aztec/accounts/testing';
import { CounterContract } from '@aztec/noir-contracts.js';
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

let pxe: PXE;
let deployer: AccountWalletWithSecretKey;
let p256AccountWallet: AccountWallet;

beforeAll(async () => {
  pxe = createPXEClient(SANDBOX_URL);

  await initAztecJs();
  deployer = (await getDeployedTestAccountsWallets(pxe))[0];

  const key = Fr.random();
  console.log('key: ', key);
  const account = await getEcdsaAccount(
    pxe,
    key,
    Buffer.from(realPubkey.x),
    Buffer.from(realPubkey.y)
  )
    .deploy()
    .wait();

  console.log('account addr: ', account.wallet.getAddress());

  // instantiate
  p256AccountWallet = await getEcdsaWallet(
    pxe,
    account.wallet.getAddress(),
    Buffer.from(realPubkey.x),
    Buffer.from(realPubkey.y)
  );

  console.log('p256AccountWallet addr: ', p256AccountWallet.getAddress());
});

describe('E2E Batcher setup', () => {
  jest.setTimeout(TIMEOUT);
  it('should successfully', async () => {
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
});

// docker run --rm -v $(pwd):/app -w /app aztecprotocol/aztec-builder:0.46.1 codegen target -o ../../src/

export function hexToBytes(hex: string): number[] {
  let formattedHex = hex;
  if (formattedHex.startsWith('0x')) {
    formattedHex = formattedHex.slice(2);
  }
  return formattedHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];
}
