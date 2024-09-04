var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import constants from '../constants';
import IconButton from '../components/IconButton';
import { ArrowLeft } from '@tamagui/lucide-icons';
export default function Send() {
    var _a;
    const navigation = useNavigation();
    const [amount, setAmount] = useState();
    const [address, setAddress] = useState();
    const [generatingProof, setGeneratingProof] = useState(false);
    const route = useRoute();
    const onConfirm = () => __awaiter(this, void 0, void 0, function* () {
        setGeneratingProof(true);
        try {
            if (!amount) {
                Alert.alert('Please enter an amount');
                return;
            }
            if (!address) {
                Alert.alert('Please enter a recipient address');
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
        // await signMessage("I'm sending money");
        //   const {_proof, pubKeyHash} = await getProof();
        //   sendTx(
        //     _proof,
        //     bytesToHex(Array.from(pubKeyHash)),
        //     Number(amount?.replace(',', '.') || 0),
        //   );
        //   navigation.navigate('Home');
        // } catch (error) {
        //   console.log(error);
        //setGeneratingProof(false);
    });
    return (<MainLayout statusBarStyle="light-content" statusBarBackgroundColor="#1F2937">
      <View style={{}}>
        <View style={{
            paddingVertical: 20,
            // Dark blue gray
            backgroundColor: '#1F2937',
            paddingBottom: 30,
        }}>
          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
        }}>
            <IconButton style={{ backgroundColor: 'transparent' }} icon={<ArrowLeft color="white"/>} onPress={() => {
            navigation.goBack();
        }}/>
            <Text style={{
            fontSize: 16,
            textTransform: 'uppercase',
            color: 'white',
        }}>
              Set the amount to send
            </Text>
          </View>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: constants.lightTextColor,
            paddingHorizontal: 20,
            marginBottom: -30,
            textAlign: 'right',
        }}>
            {(_a = route.params) === null || _a === void 0 ? void 0 : _a.currency}
          </Text>
          <TextInput keyboardType="numeric" onChangeText={text => {
            setAmount(text);
        }} value={amount} style={{
            // Slowly reduce the font size with each character
            fontSize: Math.max(100 - Math.max((((amount === null || amount === void 0 ? void 0 : amount.length) || 0) - 5) * 10, 0), 20),
            lineHeight: Math.max(100 - Math.max((((amount === null || amount === void 0 ? void 0 : amount.length) || 0) - 5) * 10, 0), 20) * 1.2,
            padding: 20,
            marginTop: 5,
            color: 'white',
            flex: 1,
            textAlign: 'right',
        }} placeholder="0.00" placeholderTextColor={constants.lightTextColor}/>
        </View>
      </View>
      <View style={{
            flex: 1,
            paddingVertical: 30,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: -20,
        }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: constants.primaryColor,
            marginBottom: 10,
        }}>
          Recipient
        </Text>
        <TextInput placeholderTextColor={constants.lightTextColor} placeholder="0x1234567890abcdef1234567890abcdef12345678" value={address} onChangeText={text => {
            setAddress(text);
        }} style={{
            fontSize: 12,
            paddingVertical: 15,
            paddingHorizontal: 20,
            color: constants.primaryColor,
            borderColor: '#E0E0E0',
            borderWidth: 1,
            borderRadius: 12,
        }}/>
        <Button disabled={generatingProof} style={{
            marginTop: 20,
        }} onPress={onConfirm}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        }}>
            {generatingProof ? 'Loading...' : 'Confirm'}
          </Text>
        </Button>
      </View>
    </MainLayout>);
}
//# sourceMappingURL=send.js.map