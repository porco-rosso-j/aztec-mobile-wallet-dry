/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainLayout from '../layouts/MainLayout';
import {useNavigation, useRoute} from '@react-navigation/native';
import constants from '../constants';
import IconButton from '../components/IconButton';
import {
  ArrowLeft,
} from '@tamagui/lucide-icons';

const CURRENCIES = [
  {
    image: require('../../assets/images/chains/ethereum.png'),
    name: 'ETH',
  },
  {
    image: require('../../assets/images/currencies/usdc.png'),
    name: 'USDC',
  },
];

function Currency({image, name}: {image: ImageSourcePropType; name: string}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Send' as never);
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 20,
          backgroundColor: constants.backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            width: 50,
            height: 50,
            resizeMode: 'cover',
          }}
          source={image}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: constants.primaryColor,
          }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Currencies() {
  const navigation = useNavigation();
  const route = useRoute();

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
            alignItems: 'center',
            paddingBottom: 30,
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
            Choose a currency
          </Text>
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
          marginTop: -20,
        }}>
        {CURRENCIES.map((currency, index) => (
          <Currency key={index} {...currency} />
        ))}
      </View>
    </MainLayout>
  );
}
