/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// import 'react-native-polyfill-globals/auto';
// import '@react-native/js-polyfills';
// import 'babel-polyfill';

// import 'process';

import './shim';
import 'react-native-get-random-values';
import './init';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
console.log('app');

AppRegistry.registerComponent(appName, () => App);
