import React, {  useState } from 'react';
import { Text, View } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import { useNavigation } from '@react-navigation/native';
import constants, { SANDBOX_URL } from '../constants';
import IconButton from '../components/IconButton';
import numeral from 'numeral';
import {
  ArrowDown,
  ArrowUp,
  LogIn,
  LogOut,
  RefreshCcw,
  Coins
} from '@tamagui/lucide-icons';
import {   
  getPublicKey,
  aztecJs, 
  getEcdsaWallet,  
  getEcdsaAccount,
  generateKeyPair
} from 'react-native-aztec-p256';
import { RootStackParamList } from 'App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TransactionItem, { TRANSACTIONS } from './transactions';
import { useBalance } from '../hooks/useBalance';
import { useToken } from '../hooks/useToken';

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState<aztecJs.AccountWallet>();

  const { token, mintTokenPublic, deloyToken } = useToken();
  const { balance, updateBalance } = useBalance(token, account);

  console.log('balance: ', balance);
  console.log('account address: ', account?.getAddress().toString());

  const logIn = async () => {
    if (loggedIn) {
      return;
    }
    try {

      const pxe = aztecJs.createPXEClient(SANDBOX_URL)
      let publicKey; 

      try {
        publicKey = await getPublicKey();
      } catch (e) {
        console.log("error", e);
        publicKey = await generateKeyPair();
      }
      console.log("publicKey", publicKey);
      const key = aztecJs.Fr.random();

      console.log("key", key.toString());

      const account = await (await getEcdsaAccount(
        pxe,
        key,
        Buffer.from(publicKey.x),
        Buffer.from(publicKey.y)
      )
      .deploy())
      .wait();

      // console.log("account", account);
      console.log("account created")
      
      // instantiate from scratch to get AccountWallet instead of Wallet
      const wallet = await getEcdsaWallet(
        pxe,
        account.wallet.getAddress(),
        Buffer.from(publicKey.x),
        Buffer.from(publicKey.y)
      );
      // console.log("wallet", wallet);
      console.log("wallet instantiated")

      setAccount(wallet);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    console.log('onRefresh called');
    updateBalance();
  };

  const onFaucet = async () => {
    console.log('onFaucet called');
    const tokenAddr = await deloyToken(account);
    console.log('deloyToken done');
    await mintTokenPublic(10, account, tokenAddr);
    console.log('mintTokenPublic done');
    updateBalance(tokenAddr);
  };

  return (
    <MainLayout
      statusBarStyle="light-content"
      statusBarBackgroundColor="#150f2d"
    >
      <View style={{}}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 30,
            // Dark blue gray
            backgroundColor: '#150f2d',
            paddingBottom: 50
          }}
        >
          <Text
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              color: constants.lightTextColor
            }}
          >
            Your balance
          </Text>
          {loggedIn && (
            <Text
              style={{
                fontSize: 50,
                marginTop: 5,
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              {numeral(balance).format('0,0.00')} ETH
            </Text>
          )}
          {!loggedIn && (
            <Text
              style={{
                fontSize: 50,
                marginTop: 5,
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              ********
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              marginTop: 15
            }}
          >
            <View
              style={{
                alignItems: 'center',
                gap: 5
              }}
            >
              <IconButton
                onPress={() => {
                  navigation.navigate('Currencies', { token, account });
                }}
                disabled={!loggedIn}
                theme="main"
                icon={<ArrowUp color={constants.primaryColor} />}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                Send
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                gap: 5
              }}
            >
              <IconButton
                disabled={!loggedIn}
                theme="secondary"
                onPress={() => {
                  navigation.navigate('Receive' as never);
                }}
                icon={<ArrowDown color={constants.primaryColor} />}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                Receive
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                gap: 5
              }}
            >
              <IconButton
                disabled={!loggedIn}
                theme="secondary"
                onPress={onFaucet}
                icon={<Coins color={constants.primaryColor} />}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                Faucet
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                gap: 5
              }}
            >
              <IconButton
                disabled={!loggedIn}
                theme="secondary"
                onPress={onRefresh}
                icon={<RefreshCcw color={constants.primaryColor} />}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                Refresh
              </Text>
            </View>
            {loggedIn && (
              <View
                style={{
                  alignItems: 'center',
                  gap: 5,
                  marginLeft: 'auto'
                }}
              >
                <IconButton
                  onPress={() => {
                    setLoggedIn(false);
                  }}
                  theme="main"
                  icon={<LogOut color={constants.primaryColor} />}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  Log out
                </Text>
              </View>
            )}
            {!loggedIn && (
              <View
                style={{
                  alignItems: 'center',
                  gap: 5,
                  marginLeft: 'auto'
                }}
              >
                <IconButton
                  onPress={() => {
                    logIn();
                  }}
                  theme="main"
                  icon={<LogIn color={constants.primaryColor} />}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  Log in
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 30,
          paddingHorizontal: 20,
          gap: 20,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20
        }}
      >
        {loggedIn && (
          <>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: constants.primaryColor
              }}
            >
              Transactions
            </Text>
            <View
              style={{
                gap: 10
              }}
            >
              {TRANSACTIONS.map((transaction, index) => (
                <TransactionItem
                  {...transaction}
                  key={index}
                  {...transaction}
                />
              ))}
            </View>
          </>
        )}
        {!loggedIn && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: constants.lightTextColor,
                textAlign: 'center'
              }}
            >
              Please login to see your transactions and balance
            </Text>
          </View>
        )}
      </View>
    </MainLayout>
  );
}
