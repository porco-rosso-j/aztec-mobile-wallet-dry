import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import config from './tamagui.config';
import { TamaguiProvider } from 'tamagui';
import Home from './src/pages/home';
import Send from './src/pages/send';
import Currencies from './src/pages/currencies';
import Receive from './src/pages/receive';
import { aztecJs } from 'react-native-aztec-p256';

export type RootStackParamList = {
  Home: undefined,
  Currencies: {
    token: string,
    account: aztecJs.AccountWallet | undefined
  },
  Send: {
    token: string,
    account: aztecJs.AccountWallet | undefined
  },
  Receive: {
    address: string
  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  console.log('App');
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Currencies" component={Currencies} />
          <Stack.Screen name="Send" component={Send} />
          <Stack.Screen name="Receive" component={Receive} />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
};

export default App;
