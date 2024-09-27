/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import constants from '../constants';
import IconButton from '../components/IconButton';
import {ArrowLeft} from '@tamagui/lucide-icons';
import { RootStackParamList } from 'App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useToken } from '../hooks/useToken';
import { sendTokenPublic } from '../scripts/token';

export default function Send() {  
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Send'>>();
  // const { sendTokenPublic } = useToken();
  const [amount, setAmount] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

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

        const token = route.params?.token;
        const account = route.params?.account;

        if (!token) {
          Alert.alert('Please enter a token');
          return;
        }

        if (!account) {
          Alert.alert('Please set an account'); 
          return;
        }

        const tx = await sendTokenPublic(address!, Number(amount!), account, token);
        console.log('tx: ', tx);
  
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
