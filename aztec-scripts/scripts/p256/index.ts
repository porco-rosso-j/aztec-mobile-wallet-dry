// import { Fq, Fr, generatePublicKey } from '@aztec/aztec.js';
// import { Ecdsa, EcdsaSignature } from '@aztec/circuits.js/barretenberg';
// import { params } from './constants';
// // ts-node --experimentalSpecifierResolution=node ./scripts/bb_rs/ecdsa.ts

// async function computePubkey() {
//   const privateKey = new Fr(
//     Buffer.from(params.)
//   );
//   console.log('privateKey: ', privateKey);
//   const pubkey = new Ecdsa().computePublicKey(privateKey.toBuffer());
//   console.log('raw: ', pubkey);
//   console.log('pubkey: ', new Uint8Array(pubkey));
//   //   console.log('pubkey x: ', new Uint8Array(pubkey..toBuffer()));
//   //   console.log('pubkey y: ', new Uint8Array(pubkey.y.toBuffer()));
// }

// // computePubkey();

// async function constructSignature() {
//   const hashed_message = Buffer.from([
//     162, 11, 221, 82, 101, 38, 145, 153, 143, 140, 164, 97, 148, 164, 55, 133,
//     17, 93, 198, 63, 125, 169, 147, 53, 229, 221, 91, 27, 2, 153, 104, 166
//   ]);
//   const privateKey = Buffer.from(
//     'ab22105985fa7a751c90cfe08613290f1fb3b4310b309a4f51f0a7f95b8855a5',
//     'hex'
//   );

//   console.log('privateKey.buffer: ', new Uint8Array(privateKey));

//   const signature = new Ecdsa().constructSignature(hashed_message, privateKey);
//   console.log('signature: ', signature);
//   console.log('r: ', new Uint8Array(signature.r));
//   console.log('s: ', new Uint8Array(signature.s));
//   // console.log('v: ', signature.v); v: 27
// }

// // constructSignature();

// async function recoverPublicKey() {
//   const hashed_message = Buffer.from([
//     162, 11, 221, 82, 101, 38, 145, 153, 143, 140, 164, 97, 148, 164, 55, 133,
//     17, 93, 198, 63, 125, 169, 147, 53, 229, 221, 91, 27, 2, 153, 104, 166
//   ]);
//   const sig_r = Buffer.from([
//     1, 188, 236, 84, 137, 101, 248, 138, 176, 59, 19, 252, 26, 182, 25, 146, 14,
//     133, 122, 82, 142, 190, 176, 190, 72, 151, 136, 152, 135, 11, 96, 156
//   ]);

//   const sig_s = Buffer.from([
//     25, 90, 155, 18, 200, 150, 103, 84, 138, 244, 113, 135, 119, 90, 175, 219,
//     203, 84, 2, 116, 181, 185, 38, 112, 213, 116, 120, 16, 112, 254, 241, 66
//   ]);

//   const signature = new EcdsaSignature(sig_r, sig_s, Buffer.from('1b', 'hex'));

//   const publicKey = new Ecdsa().recoverPublicKey(hashed_message, signature);
//   console.log('publicKey: ', publicKey);
//   console.log('publicKey U8: ', new Uint8Array(publicKey));
// }

// recoverPublicKey();
