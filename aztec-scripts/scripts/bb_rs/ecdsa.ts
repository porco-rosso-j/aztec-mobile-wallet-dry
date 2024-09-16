import { Fq, Fr, generatePublicKey } from '@aztec/aztec.js';
import { Ecdsa, EcdsaSignature } from '@aztec/circuits.js/barretenberg';

// ts-node --experimentalSpecifierResolution=node ./scripts/bb_rs/ecdsa.ts

async function computePubkey() {
  //   const rand = Fq.random();
  //   console.log('rand: ', rand);
  //   console.log('rand Uint8Array: ', new Uint8Array(rand.toBuffer()));
  const privateKey = new Fr(
    Buffer.from([
      6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
      253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
    ])
  );
  console.log('privateKey: ', privateKey);
  const pubkey = new Ecdsa().computePublicKey(privateKey.toBuffer());
  console.log('raw: ', pubkey);
  console.log('pubkey: ', new Uint8Array(pubkey));
  //   console.log('pubkey x: ', new Uint8Array(pubkey..toBuffer()));
  //   console.log('pubkey y: ', new Uint8Array(pubkey.y.toBuffer()));
}

// computePubkey();

async function constructSignature() {
  const hashed_message = Buffer.from([
    162, 11, 221, 82, 101, 38, 145, 153, 143, 140, 164, 97, 148, 164, 55, 133,
    17, 93, 198, 63, 125, 169, 147, 53, 229, 221, 91, 27, 2, 153, 104, 166
  ]);
  const privateKey = Buffer.from(
    'ab22105985fa7a751c90cfe08613290f1fb3b4310b309a4f51f0a7f95b8855a5',
    'hex'
  );

  console.log('privateKey.buffer: ', new Uint8Array(privateKey));

  const signature = new Ecdsa().constructSignature(hashed_message, privateKey);
  console.log('signature: ', signature);
  console.log('r: ', new Uint8Array(signature.r));
  console.log('s: ', new Uint8Array(signature.s));
  // console.log('v: ', signature.v); v: 27
}

// constructSignature();

async function recoverPublicKey() {
  const hashed_message = Buffer.from([
    162, 11, 221, 82, 101, 38, 145, 153, 143, 140, 164, 97, 148, 164, 55, 133,
    17, 93, 198, 63, 125, 169, 147, 53, 229, 221, 91, 27, 2, 153, 104, 166
  ]);
  const sig_r = Buffer.from([
    1, 188, 236, 84, 137, 101, 248, 138, 176, 59, 19, 252, 26, 182, 25, 146, 14,
    133, 122, 82, 142, 190, 176, 190, 72, 151, 136, 152, 135, 11, 96, 156
  ]);

  const sig_s = Buffer.from([
    25, 90, 155, 18, 200, 150, 103, 84, 138, 244, 113, 135, 119, 90, 175, 219,
    203, 84, 2, 116, 181, 185, 38, 112, 213, 116, 120, 16, 112, 254, 241, 66
  ]);

  const signature = new EcdsaSignature(sig_r, sig_s, Buffer.from('1b', 'hex'));

  const publicKey = new Ecdsa().recoverPublicKey(hashed_message, signature);
  console.log('publicKey: ', publicKey);
  console.log('publicKey U8: ', new Uint8Array(publicKey));
}

recoverPublicKey();

/*
rand:  Fq<0x06b28105099baa7fa7893d5a39d6d012953ed67ed2aa96b7f2e554c55eae6e8a>
rand Uint8Array:  Uint8Array(32) [
    6, 178, 129,   5,   9, 155, 170, 127,
  167, 137,  61,  90,  57, 214, 208,  18,
  149,  62, 214, 126, 210, 170, 150, 183,
  242, 229,  84, 197,  94, 174, 110, 138
]
privateKey.buffer:  ArrayBuffer {
  [Uint8Contents]: <06 c4 04 7e dc 30 f0 41 48 ad 28 65 bb 96 f5 73 fd c1 5b 05 2d 94 5b 4a b8 6f c8 90 24 cb 4c e5>,
  byteLength: 32
}
pubkey:  Uint8Array(64) [
  240,  75, 153,  97, 188,  46,  47, 179, 232, 151, 140,
   62, 234,  96, 159,  75, 111, 108,  49, 145,  47, 241,
   30,  12, 192, 229, 170, 234,  88,  62, 129,  55,  37,
   98, 174, 169, 104, 112, 174,  42, 154, 253, 123,   3,
   31,  54, 202, 171, 192,  51,  83, 249,  45, 134, 152,
  238, 248, 112,   6, 255, 182,  69,  82, 169
]
*/
