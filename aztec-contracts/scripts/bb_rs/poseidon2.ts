import { Fr } from '@aztec/aztec.js';
import { BarretenbergSync, Fr as FrBarretenberg } from '@aztec/bb.js';
import { poseidon2Hash } from '@aztec/foundation/crypto';
import { Fieldable } from '@aztec/foundation/serialize';
import { serializeBufferable } from './serialize';
import { BufferReader } from './ buffer_reader';

// ts-node --experimentalSpecifierResolution=node ./scripts/bb_rs/poseidon2.ts

async function poseidon2HashTest() {
  const input = new Fr(
    Buffer.from([
      6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
      253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
    ])
  );
  console.log('input: ', new Uint8Array(input.toBuffer()));
  const result = poseidon2Hash([input]);
  console.log('result: ', result);
  console.log('result: buffer', result.toBuffer());
  console.log('result u8 array: ', new Uint8Array(result.toBuffer()));
}

poseidon2HashTest();

async function poseidon2PermutationTest() {
  const input = new Fr(
    Buffer.from([
      6, 196, 4, 126, 220, 48, 240, 65, 72, 173, 40, 101, 187, 150, 245, 115,
      253, 193, 91, 5, 45, 148, 91, 74, 184, 111, 200, 144, 36, 203, 76, 229
    ])
  );

  // const inputs = [new Fr(1), new Fr(2), new Fr(3)];
  // console.log('inptus 0: ', new Uint8Array(inputs[0].toBuffer()));
  // console.log('inputs 1: ', new Uint8Array(inputs[1].toBuffer()));
  // console.log('inputs 2: ', new Uint8Array(inputs[2].toBuffer()));
  const inputs = [new Fr(1), new Fr(2), new Fr(3)];
  console.log('inptus 0: ', new Uint8Array(inputs[0].toBuffer()));
  console.log('inputs 1: ', new Uint8Array(inputs[1].toBuffer()));
  console.log('inputs 2: ', new Uint8Array(inputs[2].toBuffer()));

  // console.log('input: ', new Uint8Array(inputs[0].toBuffer()));
  const result = await poseidon2Permutation(inputs);
  console.log('result: ', result);

  const concated_result = new Uint8Array(Buffer.concat([...result.map(r => r.toBuffer())]));
  console.log('concated_result: ', concated_result);
}


// poseidon2PermutationTest();


async function poseidon2Permutation(input: Fieldable[]):Promise<Fr[]> {
    const inputFields = serializeToFields(input);
    // console.log('inputFields: ', inputFields);

    const inputs = inputFields.map(i => new FrBarretenberg(i.toBuffer()));
   console.log('inputs: ', inputs);
    // We'd like this assertion but it's not possible to use it in the browser.
    // assert(input.length === 4, 'Input state must be of size 4');

   
    const inArgs = [inputs].map(serializeB);
    // console.log("inArgs(input): ", inArgs);

    const res = (await BarretenbergSync.initSingleton()).poseidon2Permutation(
        inputs
    );

    console.log('res: ', res);
    // We'd like this assertion but it's not possible to use it in the browser.
    // assert(res.length === 4, 'Output state must be of size 4');
    return res.map(o => Fr.fromBuffer(Buffer.from(o.toBuffer())));
  }

function serializeToFields(...objs: Fieldable[]): Fr[] {
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


  function serializeB(inputsBuffer: FrBarretenberg[]): Uint8Array[] {
    return [inputsBuffer].map(serializeBufferable);
  }
