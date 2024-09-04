/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// import 'react-native-polyfill-globals/auto';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
console.log('app');

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent('ReactNativeStarter', () => App);
