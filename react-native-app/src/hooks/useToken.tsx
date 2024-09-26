import { useState } from 'react';
import { aztecJs, contractsJsToken } from 'react-native-aztec-p256';

export const useToken = () => {
  const [token, setToken] = useState<string>('');
  console.log('token addr: ', token);

  const sendTokenPublic = async (
    receipient: string,
    amount: number,
    wallet: aztecJs.AccountWallet | undefined,
    token?: string
  ) => {
    if (!token) {
      console.log('token not set');
      return;
    }

    if (!wallet) {
      console.log('wallet not set');
      return;
    }
    console.log('sendToken called');

    const tokenContract = await contractsJsToken.TokenContract.at(
      aztecJs.AztecAddress.fromString(token),
      wallet
    );
    const tx = await (
      await tokenContract.methods
        .transfer_public(
          wallet.getAddress(),
          aztecJs.AztecAddress.fromString(receipient),
          amount,
          0
        )
        .send()
    ).wait();

    console.log('tx: ', tx);
    return tx;
  };

  const mintTokenPublic = async (
    amount: number,
    wallet: aztecJs.AccountWallet | undefined,
    token?: string
  ) => {
    if (!token) {
      console.log('token not set');
      return;
    }
    if (!wallet) {
      console.log('wallet not set');
      return;
    }

    console.log('mintTokenPublic called');

    const tokenContract = await contractsJsToken.TokenContract.at(
      aztecJs.AztecAddress.fromString(token),
      wallet
    );
    const tx = await (
      await tokenContract.methods
        .mint_public(wallet.getAddress(), amount)
        .send()
    ).wait();

    console.log('tx: ', tx);
    return tx;
  };

  async function deloyToken(
    wallet: aztecJs.AccountWallet | undefined
  ): Promise<string> {
    if (!wallet) {
      console.log('wallet not set');
      return '';
    }

    // TODO: understand the stream of deployment
    // put console logs in the stream
    // identify where things go wrong, esp address calculation
    // as the error is like "db doesnt know the address"

    /*
    EcdsaAccount address: 0x0fc0f1a1f433385f691010f77c214d3f176cb1d2d76ae10b30a70f819457a7d0
    EcdsaAccount class id: 0x1290c9a7043440717cdacb61a16f74d9db3a561962d98c4a14af94f8bacf4f6c

    token address: 0x24686150fa9faa4bf440905f1b55e87e4b1ed559dd0d5a382ffddf99c40209bb 
    token classid: 0x2fbf7708257b3fcaf8337ec78c40f74578a48d183fd0ac01d0cdec819c12d031
    initializationHash: 0x02ad9fd273ca3e598de012079102b02266fa823e1f5a8eb9f7a9f72da25f66e1
    salt: 0x1d7995525cd06575c4c39e462d3c34ad34dda6195d9e24f29e3754e17c088170

    token address2: 0x09e99011873c42f41aa85d14637492ed60e113a369d3494f4c75ea353adeb1ec
    token classid2: 0x2fbf7708257b3fcaf8337ec78c40f74578a48d183fd0ac01d0cdec819c12d031
    initializationHash: 0x02ad9fd273ca3e598de012079102b02266fa823e1f5a8eb9f7a9f72da25f66e1
    salt: 0x1a553292da6dfe5c7abe88f030411ef5b39093d46c498416d80736950d92dda1

    */

    try {
      const tokenDeployMethod: aztecJs.DeployMethod =
        contractsJsToken.TokenContract.deploy(
          wallet,
          wallet.getAddress(),
          'Ethereum',
          'ETH',
          18
        );

      // account: 0x0fc0f1a1f433385f691010f77c214d3f176cb1d2d76ae10b30a70f819457a7d0
      console.log('tokenDeployMethod: ', tokenDeployMethod);

      const deployOptions = {
        contractAddressSalt: aztecJs.Fr.random()
      };

      const tokenDeployedTx: aztecJs.DeploySentTx =
        await tokenDeployMethod.send(deployOptions);

      // 'tokenDeployedTx: ', '0x09e99011873c42f41aa85d14637492ed60e113a369d3494f4c75ea353adeb1ec'
      console.log(
        'tokenDeployedTx: ',
        tokenDeployedTx.instance.address.toString()
      );

      const tokenContract = await tokenDeployedTx.deployed();

      console.log('tokenContract: ', tokenContract.address.toString());

      setToken(tokenContract.address.toString());
      return tokenContract.address.toString();
    } catch (e) {
      console.log('e: ', e);
      return '';
    }
  }

  return {
    token,
    sendTokenPublic,
    mintTokenPublic,
    deloyToken
  };
};
