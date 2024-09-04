import { useEffect, useState } from 'react';
// import { AztecAddress, createPXEClient } from '@aztec/aztec.js';
// import { getDeployedTestAccountsWallets } from '@aztec/accounts/testing';
// import { TokenContract } from '@aztec/noir-contracts.js/Token';
export const PXE_URL = 'http://localhost:8080';

export const useBalance = (address: string, token: string) => {
  const [balance, setBalance] = useState<number[]>([]);

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
