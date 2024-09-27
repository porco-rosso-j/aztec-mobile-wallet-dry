import { useState } from 'react';
import { aztecJs, contractsJsToken } from 'react-native-aztec-p256';

export const useBalance = (account: aztecJs.AccountWallet | undefined) => {
  const [balance, setBalance] = useState<number>(0);

  const getBalance = async (token: string) => {
    if (!account || token === '') {
      return;
    }

    try {
      const tokenContract = await contractsJsToken.TokenContract.at(
        aztecJs.AztecAddress.fromString(token),
        account
      );

      const balance = await tokenContract.methods
        .balance_of_public(account.getAddress())
        .simulate();

      console.log('_balance: ', balance);

      setBalance(balance);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return {
    balance,
    getBalance
  };
};
