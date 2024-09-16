import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import config from './tamagui.config';
import { TamaguiProvider, Text } from 'tamagui';
import Home from './src/pages/home';
import Send from './src/pages/send';
import Currencies from './src/pages/currencies';
import Receive from './src/pages/receive';

const Stack = createNativeStackNavigator();

// function App(): React.JSX.Element {
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
