global.process = require('process/browser');
process.version = 'v18.18.2';

import { Buffer } from 'buffer/';
global.Buffer = Buffer;

// console.log('Buffer in index.js: ', Buffer);
