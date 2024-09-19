import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MainLayout from '../layouts/MainLayout';
// import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import constants, { ACCOUNT_ADDRESS, ACCOUNT_SIGNING_PUBKEY, SANDBOX_URL, TOKEN_ADDRESS } from '../constants';
import { formatAddress } from '../scripts';
import IconButton from '../components/IconButton';
import { format, set } from 'date-fns';
import numeral from 'numeral';
import {
  ArrowDown,
  ArrowUp,
  LogIn,
  LogOut,
  RefreshCcw
} from '@tamagui/lucide-icons';
import { useBalance } from '../hooks/useBalance';
import {   
  getPublicKey,
  aztecJs, 
  getEcdsaWallet,  
  sendTokenPublic
} from 'react-native-p256';

const SAFE_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const RECIPIENT_ADDRESS = '0xaabbccddeeff00112233445566778899aabbccdd';

const TRANSACTIONS = [
  {
    currency: 'USDC',
    amount: 400,
    recipient: RECIPIENT_ADDRESS,
    sender: SAFE_ADDRESS,
    confirmed: false,
    date: new Date()
  },
  {
    currency: 'USDC',
    amount: 400,
    recipient: RECIPIENT_ADDRESS,
    sender: SAFE_ADDRESS,
    date: new Date('2024-07-13T00:00:00Z'),
    confirmed: true
  },
  {
    currency: 'USDC',
    amount: 300,
    recipient: SAFE_ADDRESS,
    sender: RECIPIENT_ADDRESS,
    date: new Date('2024-07-12T00:00:00Z'),
    confirmed: true
  },
  {
    currency: 'USDC',
    amount: 3000,
    recipient: RECIPIENT_ADDRESS,
    sender: SAFE_ADDRESS,
    date: new Date('2024-07-11T00:00:00Z'),
    confirmed: true
  },
  {
    currency: 'USDC',
    amount: 200,
    recipient: SAFE_ADDRESS,
    sender: RECIPIENT_ADDRESS,
    date: new Date('2024-07-11T00:00:00Z'),
    confirmed: true
  }
];

function TransactionItem({
  currency,
  amount,
  recipient,
  sender,
  date,
  confirmed
}: {
  currency: string,
  amount: number,
  recipient: string,
  sender: string,
  date: Date,
  confirmed: boolean
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        //paddingHorizontal: 15,
        alignItems: 'center',
        gap: 10,
        opacity: confirmed ? 1 : 0.2
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: constants.primaryColor
        }}
      >
        {recipient === SAFE_ADDRESS ? (
          <ArrowDown color="white" />
        ) : (
          <ArrowUp color="white" />
        )}
      </View>
      <View>
        <Text
          style={{
            color: constants.lightTextColor,
            fontSize: 10
          }}
        >
          {recipient === SAFE_ADDRESS ? 'From' : 'To'}
        </Text>
        <Text
          style={{
            color: constants.primaryColor,
            fontSize: 12,
            fontWeight: 'bold'
          }}
        >
          {formatAddress(recipient === SAFE_ADDRESS ? sender : recipient)}
        </Text>
      </View>
      <View
        style={{
          marginLeft: 'auto',
          alignItems: 'flex-end'
        }}
      >
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Text
            style={{
              color:
                recipient === SAFE_ADDRESS
                  ? constants.redColor
                  : constants.greenColor,
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            {recipient === SAFE_ADDRESS ? '-' : '+'}
            {numeral(amount).format('0,0.00')}
          </Text>
          <Text
            style={{
              color: constants.primaryColor,
              fontSize: 10,
              fontWeight: 'bold'
            }}
          >
            {currency}
          </Text>
        </View>
        <Text
          style={{
            color: constants.lightTextColor,
            fontSize: 10
          }}
        >
          {format(date, 'dd/MM/yyyy')}
        </Text>
      </View>
    </View>
  );
}

export default function Home() {
  console.log('Home');
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);

  const [address, setAddress] = useState<string>(ACCOUNT_ADDRESS);
  const [token, setToken] = useState<string>(TOKEN_ADDRESS);
  const [account, setAccount] = useState<aztecJs.AccountWallet>();
  const { balance } = useBalance(token, account);
  console.log('balance: ', balance);
  console.log('account: ', account);

  useEffect(() => {
    const setup = async () => {
      const pubkey = await getPublicKey();
      console.log("pubkey: ", pubkey);

      const account = await getEcdsaWallet(
        aztecJs.createPXEClient(SANDBOX_URL),
        aztecJs.AztecAddress.fromString(address),
        Buffer.from(ACCOUNT_SIGNING_PUBKEY.x),
        Buffer.from(ACCOUNT_SIGNING_PUBKEY.y)
      );
      setAccount(account);
    };
    if (address && !account) {
      setup();
    }
  }, [address,account]);

  const onRefresh = async () => {};

  const logIn = async () => {
    if (loggedIn) {
      return;
    }
    try {
      // await getPublicKey();
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
      try {
        // await generateKeyPair();
        setLoggedIn(true);
      } catch (error) {}
    }
  };

  useEffect(() => {
    logIn();
  }, []);

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
                  navigation.navigate('Currencies' as never);
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
