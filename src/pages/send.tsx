/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import constants, { ACCOUNT_ADDRESS, SANDBOX_URL } from '../constants';
import IconButton from '../components/IconButton';
import {ArrowLeft} from '@tamagui/lucide-icons';
import {   
  getPublicKey,
  aztecJs, 
  getEcdsaWallet,  
  sendTokenPublic
} from 'react-native-p256';

const TOKEN_ADDRESS = '0x00c13f15e6e64dde086aa6c349e6aac63f5c77215ed6a8a3e1a29c3231c8bd03';

export default function Send() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  const onConfirm = async () => {
    console.log("onConfirm....")
    setLoading(true);
    try {
      if (!amount) {
        Alert.alert('Please enter an amount');
        return;
      }
      if (!address) {
        Alert.alert('Please enter a recipient address');
        return;
      }
    } catch (error) {
      console.log(error);
    }

    try {

        const pxe = aztecJs.createPXEClient(SANDBOX_URL);
        console.log("pxe: ", pxe);
    
        const pubkey = await getPublicKey();
        console.log("pubkey: ", pubkey);
        const ecdsaContract = await getEcdsaWallet(
          pxe,
          aztecJs.AztecAddress.fromString(ACCOUNT_ADDRESS),
          Buffer.from(pubkey.x),
          Buffer.from(pubkey.y)
        );

        const tx = await sendTokenPublic(TOKEN_ADDRESS, address!, Number(amount!), ecdsaContract);
        console.log('tx: ', tx);


        // const input = new Fr(
        //   Buffer.from([
        //     6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
        //     253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
        //   ])
        // );
    
        // const input64 = Buffer.from([
        //     10,  20,  11, 112, 191,  28, 187, 209,
        //     16, 224, 109,  67, 220, 252,  21, 253,
        //    197, 127, 255, 251,  40,  36, 222,  99,
        //     58, 214, 146, 187, 154,  28, 243, 170,
        //     29,  75,  79, 144,  90, 243, 224,
        //     103,  12, 230,  99, 104, 113, 118,
        //      25, 138, 105, 134, 189, 217, 252,
        //     167, 219, 252, 232,  99, 176, 187,
        //      16, 237, 187,  75
        //   ]);
    
        //   const scalar = Buffer.from([
        //       38, 209, 203, 129,  53,  25, 228, 154,
        //       86, 202, 221, 170,   4, 204,  73, 124,
        //       76, 104, 130,  60, 211, 101, 127, 187,
        //       70, 204,  95, 191, 132, 198, 207,  36        
        //   ]);
      
        // console.log("ecdsaContract: ", ecdsaContract);
        // const message = "I'm sending money";
    
        // const sig = await signMessage(message);
        // console.log("sig: ", sig);
    
        // const accountInstance = await EcdsaAccountContractInstance.at(
        //       ecdsaContract.getAddress(),
        //       ecdsaContract
        // );
    
        // console.log("accountInstance: ", accountInstance);
    
        // const returnValue = await accountInstance
        //   .methods.test_verify_signature(
        //     await parseMessage(message),
        //     sig,
        //     pubkey.x,
        //     pubkey.y
        //   )
        //   .simulate();
    
        // console.log("returnValue: ", returnValue); 
  
    } catch (error) {
      console.log(error);
    }

    setLoading(false)
};


  return (
    <MainLayout
      statusBarStyle="light-content"
      statusBarBackgroundColor="#1F2937">
      <View style={{}}>
        <View
          style={{
            paddingVertical: 20,
            // Dark blue gray
            backgroundColor: '#1F2937',
            paddingBottom: 30,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <IconButton
              style={{backgroundColor: 'transparent'}}
              icon={<ArrowLeft color="white" />}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text
              style={{
                fontSize: 16,
                textTransform: 'uppercase',
                color: 'white',
              }}>
              Set the amount to send
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: constants.lightTextColor,
              paddingHorizontal: 20,
              marginBottom: -30,
              textAlign: 'right',
            }}>
            {(route.params as any)?.currency}
          </Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={text => {
              setAmount(text);
            }}
            value={amount}
            style={{
              // Slowly reduce the font size with each character
              fontSize: Math.max(
                100 - Math.max(((amount?.length || 0) - 5) * 10, 0),
                20,
              ),
              lineHeight:
                Math.max(
                  100 - Math.max(((amount?.length || 0) - 5) * 10, 0),
                  20,
                ) * 1.2,
              padding: 20,
              marginTop: 5,
              color: 'white',
              flex: 1,
              textAlign: 'right',
            }}
            placeholder="0.00"
            placeholderTextColor={constants.lightTextColor}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: constants.primaryColor,
            marginBottom: 10,
          }}>
          Recipient
        </Text>
        <TextInput
          placeholderTextColor={constants.lightTextColor}
          placeholder="0x00d7ac035cba5a48cfc27f25071387fa9038d3edd3f2c56522287c09e386d5e2"
          value={address}
          onChangeText={text => {
            setAddress(text);
          }}
          style={{
            fontSize: 12,
            paddingVertical: 15,
            paddingHorizontal: 20,
            color: constants.primaryColor,
            borderColor: '#E0E0E0',
            borderWidth: 1,
            borderRadius: 12,
          }}
        />
        <Button
          disabled={loading}
          style={{
            marginTop: 20,
          }}
          onPress={onConfirm}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {loading ? 'Loading...' : 'Confirm'}
          </Text>
        </Button>
      </View>
    </MainLayout>
  );
}
