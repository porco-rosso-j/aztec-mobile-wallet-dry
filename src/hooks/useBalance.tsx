import { useEffect, useState } from 'react';
// import { AztecAddress, createPXEClient } from '@aztec/aztec.js';
import { BarretenbergSync } from '@aztec/bb.js';
// // @ts-ignore
// import { INITIAL_TEST_SECRET_KEYS } from '@aztec/accounts/testing';
// import { createPXEClient, initAztecJs } from '@aztec/aztec.js';

// import { INITIAL_TEST_SECRET_KEYS } from '../dest/testing';
// import { TokenContract } from '@aztec/noir-contracts.js/Token';
export const PXE_URL = 'http://localhost:8080';

export const useBalance = (address: string, token: string) => {
  const [balance, setBalance] = useState<number[]>([]);

  useEffect(() => {
    const _getSingleton = async () => {
      try {
        console.log(
          'WebAssembly availability:',
          typeof WebAssembly !== 'undefined'
        );

        // Wait for initSingleton to complete
        await BarretenbergSync.initSingleton();
        //  await initAztecJs();
        // console.log('BarretenbergSync', BarretenbergSync);
        // Ensure initSingleton has fully completed before accessing getSingleton()
        // const barretenberg = BarretenbergSync.getSingleton();
        // console.log('barretenberg', barretenberg);
        // const pxe = createPXEClient(PXE_URL);
        // console.log('pxe', pxe);
        // console.log('INITIAL_TEST_SECRET_KEYS: ', INITIAL_TEST_SECRET_KEYS);
        // Now, continue with balance retrieval logic using `barretenberg`
        // For example:
        // const balance = await barretenberg.getBalance(address, token);
        // setBalance(balance);
      } catch (error) {
        console.error('Error initializing BarretenbergSync:', error);
      }
    };

    _getSingleton();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      const balances = await _getBalance(address, token);
      setBalance(balances);
    };

    if (address && token) {
      getBalance();
    }
  }, []);

  return {
    balance
  };
};

export async function _getBalance(
  address: string,
  token: string
): Promise<[number, number]> {
  // const pxe = createPXEClient(PXE_URL);
  // const wallet = (await getDeployedTestAccountsWallets(pxe))[0];

  // const l2tokenContract = await TokenContract.at(
  //   AztecAddress.fromString(token),
  //   wallet
  // );

  // const aztecAddress = AztecAddress.fromString(address);

  // const publicBalance = await l2tokenContract.methods
  //   .balance_of_public(aztecAddress)
  //   .simulate();

  // const privateBalance = await l2tokenContract.methods
  //   .balance_of_private(aztecAddress)
  //   .simulate({ from: aztecAddress });

  // return [Number(publicBalance), Number(privateBalance)];
  return [100, 1000];
}

//   const { AztecAddress, createPXEClient } = await import('@aztec/aztec.js');
//   const { TokenContract } = await import('@aztec/noir-contracts.js/Token');
//   const { getDeployedTestAccountsWallets } = await import(
//     '@aztec/accounts/testing'
//   );
