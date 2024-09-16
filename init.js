// import { BarretenbergSync } from '@aztec/bb.js';
// await BarretenbergSync.initSingleton();

// import { initAztecJs } from "@aztec/aztec.js";
// await initAztecJs();

// import * as WebAssembly from 'react-native-webassembly';

// // Override the global WebAssembly with the polyfill
// global.WebAssembly = WebAssembly;
// console.log('WebAssembly in index.js: ', WebAssembly);

import { Buffer } from 'buffer/';
global.Buffer = Buffer;

console.log('Buffer in index.js: ', Buffer);
