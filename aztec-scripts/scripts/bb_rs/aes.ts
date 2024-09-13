import { Aes128 } from '@aztec/circuits.js/barretenberg';
import { randomBytes } from '@aztec/foundation/crypto';

// ts-node --experimentalSpecifierResolution=node ./scripts/bb_rs/aes.ts

async function aesEncryptBufferCbc() {
  //   const key = randomBytes(16);
  //   const iv = randomBytes(16);

  //   console.log('key: ', new Uint8Array(key));
  //   console.log('iv: ', new Uint8Array(iv));

  const key = Buffer.from([
    225, 168, 31, 197, 3, 144, 253, 98, 206, 169, 154, 199, 178, 43, 32, 79
  ]);

  const iv = Buffer.from([
    211, 212, 43, 21, 246, 77, 247, 93, 115, 207, 52, 165, 216, 81, 100, 132
  ]);

  const message = Buffer.from([
    6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115, 253,
    193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
  ]);

  const encryptedData = new Aes128().encryptBufferCBC(message, iv, key);
  console.log('encryptedData: ', encryptedData);
  console.log('encryptedData U8: ', new Uint8Array(encryptedData));
}

// aesEncryptBufferCbc();

async function aesDecryptBufferCbc() {
  const key = Buffer.from([
    225, 168, 31, 197, 3, 144, 253, 98, 206, 169, 154, 199, 178, 43, 32, 79
  ]);

  const iv = Buffer.from([
    211, 212, 43, 21, 246, 77, 247, 93, 115, 207, 52, 165, 216, 81, 100, 132
  ]);

  const encryptedData = Buffer.from([
    184, 87, 245, 35, 196, 181, 226, 98, 168, 220, 71, 210, 211, 146, 221, 241,
    36, 170, 216, 19, 15, 49, 35, 173, 112, 0, 32, 160, 1, 82, 240, 27, 238, 85,
    228, 133, 206, 185, 5, 66, 171, 163, 85, 43, 99, 84, 129, 79
  ]);

  const decryptedData = new Aes128().decryptBufferCBC(encryptedData, iv, key);
  console.log('decryptedData: ', decryptedData);
  console.log('decryptedData U8: ', new Uint8Array(decryptedData));
}

aesDecryptBufferCbc();
