import { useEffect, useState } from 'react';
// import { AztecAddress, createPXEClient } from '@aztec/aztec.js';
// import { BarretenbergSync } from '@aztec/bb.js';
// import { Fr } from '@aztec/aztec.js';

// @ts-ignore
// import { INITIAL_TEST_SECRET_KEYS } from '@aztec/accounts/testing';
// import { createPXEClient, initAztecJs } from '@aztec/aztec.js';

// import { INITIAL_TEST_SECRET_KEYS } from '../dest/testing';
// import { TokenContract } from '@aztec/noir-contracts.js/Token';
// export const PXE_URL = 'http://localhost:8080';
// import { NativeModules } from 'react-native';
// import {
//   checkHasKey,
//   generateKeyPair,
//   getPublicKey
// } from '../scripts/secure-enclave';
// const { BBSwiftModule } = NativeModules;
import { aztecJs, getBalance } from 'react-native-p256';

export const useBalance = (
  token: string,
  account: aztecJs.AccountWallet | undefined
) => {
  const [balance, setBalance] = useState<number>();
  // console.log('NativeModules in useBalance: ', NativeModules);
  // console.log('BBSwiftModule in useBalance: ', BBSwiftModule);

  useEffect(() => {
    const _getBalance = async () => {
      if (!account) {
        return;
      }
      const balance = await getBalance(token, account);
      console.log('balance: ', balance);
      setBalance(balance);
    };
    _getBalance();
  }, [account]);

  // useEffect(() => {
  //   console.log('useEffect pedersenCommit');
  //   const _pedersenCommit = async () => {
  //     console.log(
  //       'pedersenHash : ',
  //       await bbJs.Barretenberg.new().pedersenCommit([input])
  //     );
  //   };

  //   _pedersenCommit();
  // }, []);

  // useEffect(() => {
  //   console.log('useEffect poseidon2Hash');
  //   const _poseidon2Hash = async () => {
  //     await bbJs.Barretenberg.new().poseidon2Hash([input]);
  //   };

  //   _poseidon2Hash();
  // }, []);

  // useEffect(() => {
  //   const _getSingleton = async () => {
  // console.log('_getSingleton....');
  // console.log(
  //   'NativeModules.SecureEnclaveModule: ',
  //   NativeModules.SecureEnclaveModule
  // );
  // try {
  //   console.log('existing keypair: ', await getPublicKey());
  // } catch (error) {
  //   console.log(error);
  //   const keypair = await generateKeyPair();
  //   console.log('keypair: ', keypair);
  // }
  // try
  // 1. use await instead of then
  // 2. test in swfit
  //
  // try {
  //   const pxe = createPXEClient(PXE_URL);
  //   console.log('pxe', pxe);
  // } catch (error) {
  //   console.error('failed to log INITIAL_TEST_SECRET_KEYS ', error);
  // }
  // console.log(
  //   'WebAssembly availability:',
  //   typeof WebAssembly !== 'undefined'
  // );
  // // Wait for initSingleton to complete
  // await BarretenbergSync.initSingleton();
  //  await initAztecJs();
  // console.log('BarretenbergSync', BarretenbergSync);
  // Ensure initSingleton has fully completed before accessing getSingleton()
  // const barretenberg = BarretenbergSync.getSingleton();
  // console.log('barretenberg', barretenberg);
  // console.log('INITIAL_TEST_SECRET_KEYS: ', INITIAL_TEST_SECRET_KEYS);
  // Now, continue with balance retrieval logic using `barretenberg`
  // For example:
  // const balance = await barretenberg.getBalance(address, token);
  // setBalance(balance);
  // } catch (error) {
  //   console.error('Error initializing BarretenbergSync:', error);
  // }
  //   };

  //   _getSingleton();
  // }, []);

  return {
    balance
  };
};
