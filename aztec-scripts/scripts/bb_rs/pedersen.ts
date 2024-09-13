import { Fr } from '@aztec/aztec.js';
import {
  pedersenHash,
  pedersenCommit,
  pedersenHashBuffer
} from '@aztec/foundation/crypto';

// ts-node --experimentalSpecifierResolution=node ./scripts/bb_rs/pedersen.ts

async function pedersenTest() {
  const input = new Fr(
    Buffer.from([
      6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
      253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
    ])
  );
  console.log('input: ', new Uint8Array(input.toBuffer()));
  const result = pedersenHash([input]);
  console.log('result: ', result);
  console.log('result: buffer', result.toBuffer());
  console.log('result u8 array: ', new Uint8Array(result.toBuffer()));
}

pedersenTest();

async function pedersenCommitTest() {
  const input = Buffer.from([
    6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115, 253,
    193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
  ]);
  console.log('input: ', new Uint8Array(input));
  const result = pedersenCommit([input]);
  console.log('result: ', result);
  console.log('result [u8] x: ', new Uint8Array(result[0]));
  console.log('result [u8] y: ', new Uint8Array(result[1]));
}

pedersenCommitTest();
