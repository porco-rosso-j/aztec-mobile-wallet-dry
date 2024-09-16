import { Fq, Fr } from '@aztec/aztec.js';
import {
  pedersenHash,
  pedersenCommit,
  pedersenHashBuffer
} from '@aztec/foundation/crypto';
import { Fieldable } from '@aztec/foundation/serialize';
import { type Bufferable, numToUInt32BE, boolToBuffer, serializeBigInt } from '@aztec/foundation/serialize'

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

// pedersenTest();

async function pedersenTest2() {
  const input1 = new Fr(
    Buffer.from([
      6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
      253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
    ])
  );
  const input2 = new Fr(
    Buffer.from([
      6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
      253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
    ])
  );

  const inputsBuffer = [input1, input2];

  const initArgs = inputsBuffer.map(f => f.toBuffer());
  console.log('initArgs: ', initArgs);
  // console.log('input1: ', new Uint8Array(input1.toBuffer()));
  // console.log('input2: ', new Uint8Array(input2.toBuffer()));
  // const result = pedersenHash([input1, input2]);
  // console.log('result: ', result);
  // console.log('result: buffer', result.toBuffer());
  // console.log('result u8 array: ', new Uint8Array(result.toBuffer()));
  /*
  result u8 array:  Uint8Array(32) [
   12, 143, 246, 102,  29,  58,  30,  11,
   48, 165,  19, 192,  96,  15,  65, 173,
    5,  44, 179,  92,  44, 121, 127, 204,
  200, 126, 241, 203, 251, 219,  51, 225
]
  */
}

// pedersenTest2();

async function pedersenCommitTest() {
  const input1 = Buffer.from([
    6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115, 253,
    193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
  ]);

  const input2 = Buffer.from([
    6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115, 253,
    193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
  ]);

  console.log('input1: ', new Uint8Array(input1));
  console.log('input2: ', new Uint8Array(input2));
  const result = pedersenCommit([input1, input2]);
  console.log('result: ', result);
  result.map(byte => console.log(new Uint8Array(byte)));
  /*
  result u8 array:  Uint8Array(32) [
   12, 143, 246, 102,  29,  58,  30,  11,
   48, 165,  19, 192,  96,  15,  65, 173,
    5,  44, 179,  92,  44, 121, 127, 204,
  200, 126, 241, 203, 251, 219,  51, 225
]
  */
}

// pedersenCommitTest();

// async function pedersenCommitTest() {
//   const input = Buffer.from([
//     6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115, 253,
//     193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
//   ]);
//   console.log('input: ', new Uint8Array(input));
//   const result = pedersenCommit([input]);
//   console.log('result: ', result);
//   console.log('result [u8] x: ', new Uint8Array(result[0]));
//   console.log('result [u8] y: ', new Uint8Array(result[1]));
// }

// pedersenCommitTest();


export function serializeToFields(...objs: Fieldable[]): Fr[] {
  const ret: Fr[] = [];
  for (const obj of objs) {
    if (Array.isArray(obj)) {
      ret.push(...serializeToFields(...obj));
    } else if (obj instanceof Fr) {
      ret.push(obj);
    } else if (typeof obj === 'boolean' || typeof obj === 'number' || typeof obj === 'bigint') {
      ret.push(new Fr(obj));
    } else if ('toFields' in obj) {
      ret.push(...obj.toFields());
    } else if ('toFr' in obj) {
      ret.push(obj.toFr());
    } else if ('toField' in obj) {
      ret.push(obj.toField());
    } else if (Buffer.isBuffer(obj)) {
      ret.push(Fr.fromBuffer(obj));
    } else {
      throw new Error(`Cannot serialize input to field: ${typeof obj} ${(obj as any).constructor?.name}`);
    }
  }
  return ret;
}

export function serializeToBufferArray(...objs: Bufferable[]): Buffer[] {
  const ret: Buffer[] = [];
  for (const obj of objs) {
    if (Array.isArray(obj)) {
      ret.push(...serializeToBufferArray(...obj));
    } else if (Buffer.isBuffer(obj)) {
      ret.push(obj);
    } else if (typeof obj === 'boolean') {
      ret.push(boolToBuffer(obj));
    } else if (typeof obj === 'bigint') {
      // Throw if bigint does not fit into 32 bytes
      if (obj > BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')) {
        throw new Error(`BigInt ${obj} does not fit into 32 bytes`);
      }
      ret.push(serializeBigInt(obj));
    } else if (typeof obj === 'number') {
      // Note: barretenberg assumes everything is big-endian
      ret.push(numToUInt32BE(obj)); // TODO: Are we always passing numbers as UInt32?
    } else if (typeof obj === 'string') {
      ret.push(numToUInt32BE(obj.length));
      ret.push(Buffer.from(obj));
    } else if ('toBuffer' in obj) {
      ret.push(obj.toBuffer());
    } else {
      throw new Error(`Cannot serialize input to buffer: ${typeof obj} ${(obj as any).constructor?.name}`);
    }
  }
  return ret;
}

async function serializeTest() {
  const inputs = [new Fr(
    Buffer.from([
      6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
      253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
    ])
  ),
  new Fr(
    Buffer.from([
      6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
      253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
    ])
  )
];


// const initArgs = inputs.flatMap(f => Array.from(f.toBuffer()));
// console.log('initArgs: ', initArgs);

//   const result = serializeToFields(inputs);
//   console.log('result: ', result[0].toBuffer());
//   console.log('result len: ', result[0].toBuffer().length);

// const ret = Array.from(inputs[0].toBuffer());
// console.log('ret: ', ret);

console.log('rand: ', new Uint8Array(Fq.random().toBuffer()));
}

serializeTest()