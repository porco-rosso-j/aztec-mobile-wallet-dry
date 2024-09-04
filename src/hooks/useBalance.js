var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from 'react';
// import { AztecAddress, createPXEClient } from '@aztec/aztec.js';
// import { getDeployedTestAccountsWallets } from '@aztec/accounts/testing';
// import { TokenContract } from '@aztec/noir-contracts.js/Token';
export const PXE_URL = 'http://localhost:8080';
export const useBalance = (address, token) => {
    const [balance, setBalance] = useState([]);
    useEffect(() => {
        const getBalance = () => __awaiter(void 0, void 0, void 0, function* () {
            const balances = yield _getBalance(address, token);
            setBalance(balances);
        });
        if (address && token) {
            getBalance();
        }
    }, []);
    return {
        balance
    };
};
export function _getBalance(address, token) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
//   const { AztecAddress, createPXEClient } = await import('@aztec/aztec.js');
//   const { TokenContract } = await import('@aztec/noir-contracts.js/Token');
//   const { getDeployedTestAccountsWallets } = await import(
//     '@aztec/accounts/testing'
//   );
//# sourceMappingURL=useBalance.js.map