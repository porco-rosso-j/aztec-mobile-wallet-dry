// import barretenbergModule from '../../barretenberg.wasm';
// import { decode } from 'base64-arraybuffer';

import axios from 'axios';

export async function fetchCode() {
  const { data: bufferSource } = await axios({
    url: 'https://raw.githubusercontent.com/porco-rosso-j/bb_wasm/main/barretenberg.wasm',
    method: 'get',
    responseType: 'arraybuffer'
  });
  console.log('Fetched Wasm file:', bufferSource.byteLength);

  return bufferSource;
}

// export async function fetchCode() {
//   const res = await fetch(barretenbergModule);
//   console.log('res: ', res.ok);

//   if (!res.ok) {
//     throw new Error('Failed to fetch wasm file.');
//   }

//   const url = res.url;
//   const dataPrefix = 'data:application/wasm;base64,';

//   try {
//     const ret = await decode(url.slice(dataPrefix.length));
//     console.log('ret length: ', ret.byteLength);
//     return ret;
//   } catch (err) {
//     console.log('err: ', err);
//     throw new Error('Failed to decode wasm file.');
//   }
// }

// const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);

// const decode = async function (base64: string): Promise<ArrayBuffer> {
//   var bufferLength = base64.length * 0.75,
//     len = base64.length,
//     i,
//     p = 0,
//     encoded1,
//     encoded2,
//     encoded3,
//     encoded4;

//   console.log('bufferLength: ', bufferLength);
//   if (base64[base64.length - 1] === '=') {
//     bufferLength--;
//     if (base64[base64.length - 2] === '=') {
//       bufferLength--;
//     }
//   }

//   var arraybuffer = new ArrayBuffer(bufferLength),
//     bytes = new Uint8Array(arraybuffer);

//   console.log('arraybuffer length: ', arraybuffer.byteLength);
//   for (i = 0; i < len; i += 4) {
//     encoded1 = lookup[base64.charCodeAt(i)];
//     encoded2 = lookup[base64.charCodeAt(i + 1)];
//     encoded3 = lookup[base64.charCodeAt(i + 2)];
//     encoded4 = lookup[base64.charCodeAt(i + 3)];
//     bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
//     bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
//     bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
//   }
//   console.log('arraybuffer length after: ', arraybuffer.byteLength);
//   return arraybuffer;
// };

// // Annoyingly the wasm declares if it's memory is shared or not. So now we need two wasms if we want to be
// // able to fallback on "non shared memory" situations.
// export async function fetchCode() {
//   const res = await fetch(barretenbergModule);
//   console.log('res: ', res.ok);

//   if (!res.ok) {
//     throw new Error('Failed to fetch wasm file.');
//   }

//   // Check if the URL is a base64-encoded data URL
//   const url = res.url;
//   const dataPrefix = 'data:application/wasm;base64,';

//   if (url.startsWith(dataPrefix)) {
//     console.log('decoding...');
//     const base64Data = url.slice(dataPrefix.length); // Extract base64 part
//     // console.log('base64Data: ', base64Data);
//     const binaryString = await atob(base64Data); // Decode base64 to binary string
//     // console.log('binaryString: ', binaryString);
//     // Convert binary string to ArrayBuffer
//     const len = binaryString.length;
//     console.log('len: ', len);
//     const bytes = new Uint8Array(len);
//     console.log('bytes before: ', bytes.length);
//     for (let i = 0; i < len; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }
//     console.log('bytes after: ', bytes.length);

//     return bytes.buffer; // Return as ArrayBuffer
//   } else {
//     // If not a data URL, fallback to regular fetch
//     return await res.arrayBuffer();
//   }
// }

// async function atob(encodedString: string) {
//   const buffer = Buffer.from(encodedString, 'base64').toString('binary');
//   // console.log('buffer in atob: ', buffer);
//   return buffer;
// }
