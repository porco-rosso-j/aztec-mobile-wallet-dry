import { AztecAddress } from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js/Token';
export const getBalance = async (tokenAddr, wallet) => {
    console.log('getBalance called');
    const token = await TokenContract.at(AztecAddress.fromString(tokenAddr), wallet);
    const balance = await token.methods
        .balance_of_public(wallet.getAddress())
        .simulate();
    console.log('balance: ', balance);
    return Number(balance);
};
export const sendTokenPublic = async (address, receipient, amount, wallet) => {
    console.log('sendToken called');
    const token = await TokenContract.at(AztecAddress.fromString(address), wallet);
    const tx = await (await token.methods
        .transfer_public(wallet.getAddress(), AztecAddress.fromString(receipient), amount, 0)
        .send()).wait();
    console.log('tx: ', tx);
    return tx;
};
export const sendToken = async (address, receipient, amount, wallet) => {
    console.log('sendToken called');
    const token = await TokenContract.at(AztecAddress.fromString(address), wallet);
    const tx = await (await token.methods
        .transfer(AztecAddress.fromString(receipient), amount)
        .send()).wait();
    console.log('tx: ', tx);
    return tx;
};
//# sourceMappingURL=index.js.map