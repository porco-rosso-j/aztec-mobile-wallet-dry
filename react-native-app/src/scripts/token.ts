import { aztecJs, contractsJsToken } from 'react-native-aztec-p256';

export async function getBalance(
  account: aztecJs.AccountWallet | undefined,
  token: string
): Promise<number> {
  if (!account || token === '') {
    return 0;
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
    return Number(balance);
  } catch (error) {
    console.log('error: ', error);
    return 0;
  }
}

export async function sendTokenPublic(
  receipient: string,
  amount: number,
  wallet: aztecJs.AccountWallet | undefined,
  token: string
) {
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
}

export async function mintTokenPublic(
  amount: number,
  wallet: aztecJs.AccountWallet | undefined,
  token?: string
) {
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
    await tokenContract.methods.mint_public(wallet.getAddress(), amount).send()
  ).wait();

  console.log('tx: ', tx);
  return tx;
}

export async function deloyToken(
  wallet: aztecJs.AccountWallet | undefined
): Promise<string> {
  if (!wallet) {
    console.log('wallet not set');
    return '';
  }

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

    const tokenDeployedTx: aztecJs.DeploySentTx = await tokenDeployMethod.send(
      deployOptions
    );

    // 'tokenDeployedTx: ', '0x09e99011873c42f41aa85d14637492ed60e113a369d3494f4c75ea353adeb1ec'
    console.log(
      'tokenDeployedTx: ',
      tokenDeployedTx.instance.address.toString()
    );

    const tokenContract = await tokenDeployedTx.deployed();

    console.log('tokenContract: ', tokenContract.address.toString());

    //   setToken(tokenContract.address.toString());
    return tokenContract.address.toString();
  } catch (e) {
    console.log('e: ', e);
    return '';
  }
}
