import { BarretenbergWasmBase } from '../barretenberg_wasm_base/index.js';
import { HeapAllocator } from './heap_allocator.js';
// import * as WebAssembly from 'react-native-webassembly';

    // const importObj = this.getImportObj();

    // console.log('importObj: ', importObj)

    // if (!importObj) {
    //   throw new Error('importObj undefined');
    // }

/**
 * This is the "main thread" implementation of BarretenbergWasm.
 * It spawns a bunch of "child thread" implementations.
 * In a browser context, this still runs on a worker, as it will block waiting on child threads.
 */
export class BarretenbergWasmMain extends BarretenbergWasmBase {

  public async init(wasmFile: ArrayBuffer, initial?: number) {
    console.log('wasmFile len in BarretenbergWasmMain: ', wasmFile.byteLength);
    console.log('WebAssembly availability:', typeof WebAssembly !== 'undefined');
    console.log('WebAssembly: ', WebAssembly);
  
    // const initialValues = [50, 256, 410, 512, 1200, 32767, 60000, 100000]; // List of initial memory values to try
    const initialValues = [8, 16, 256, 1000, 32767, 65536]; // List of initial memory values to try
  
    for (const initial of initialValues) {
      if (this.instance) {
        console.log('Instance already exists, skipping instantiation with initial memory:', initial);
        return; // Exit the function if instance already exists
      };

      console.log(`Trying instantiation with initial memory: ${initial}`);

      // this.memory = new WebAssembly.Memory({
      //   initial: initial
      // });

      const importObj = this.getImportObj()
      importObj.env.memory = new WebAssembly.Memory({
        initial: initial
      })

      try {
        // @ts-ignore
        const { instance } = await WebAssembly.instantiate(wasmFile, importObj);

        // // @ts-ignore
        // this.memory = instance.exports.memory!;
        // console.log('this.memory: ', this.memory)
      
        console.log('Instance successfully created with initial memory:', initial);
        console.log('instance: ', this.instance)
        
        if (!instance) {
          throw new Error('Instance is undefined');
        }
  
        // Assign the instance
        this.instance = instance;
  
        // Init all global/static data
        this.call('_initialize');
        return; // Exit the function after successful instantiation
      } catch (err) {
        console.log(`Instantiation failed with initial memory ${initial}:`, err);
      }
    }
  
    throw new Error('All instantiation attempts failed');
  }

  
  /**
   * Init as main thread. Spawn child threads.
   */
  // public async init(
  //   // module: WebAssembly.Module,
  //   wasmFile: ArrayBuffer,
  //   // initial = 32767,
  //   initial = 500,
  //   // maximum = 2 ** 16,
  // ) {

  //   console.log('wasmFile len in BarretenbergWasmMain: ', wasmFile.byteLength)
  //   console.log('WebAssembly availabilityyyy:', typeof WebAssembly !== 'undefined');
  //   console.log('WebAssembly: ', WebAssembly)  

  //   try {
  //     const { instance } = await WebAssembly.instantiate(wasmFile, {
  //       env: {
  //         memory: new WebAssembly.Memory({ initial }),
  //       }
  //     });

  //     console.log('instance: ', instance)
  
  //     if (!instance) {
  //       throw new Error('instance undefined');
  //     }
  
  //     // Assign the instance
  //     this.instance = instance;
  
  //     // Init all global/static data.
  //     this.call('_initialize');
  //   } catch (err) {
  //     console.log('err: ', err);
  //     throw new Error(' WebAssembly.instantiate failed: ' + err);
  //   }

  // }

  protected getImportObj() {
    const baseImports = super.getImportObj();

    /* eslint-disable camelcase */
    return {
      ...baseImports,
      wasi: {
        'thread-spawn': (arg: number) => {
          return 1;
        },
      },
      env: {
        ...baseImports.env,
        env_hardware_concurrency: () => {
          // If there are no workers (we're already running as a worker, or the main thread requested no workers)
          // then we return 1, which should cause any algos using threading to just not create a thread.
          return 1
        },
      },
    };
    /* eslint-enable camelcase */
  }

  callWasmExport(funcName: string, inArgs: Uint8Array[], outLens: (number | undefined)[]) {
    const alloc = new HeapAllocator(this);
    const inPtrs = alloc.copyToMemory(inArgs);
    const outPtrs = alloc.getOutputPtrs(outLens);
    this.call(funcName, ...inPtrs, ...outPtrs);
    const outArgs = this.getOutputArgs(outLens, outPtrs, alloc);
    alloc.freeAll();
    return outArgs;
  }

  private getOutputArgs(outLens: (number | undefined)[], outPtrs: number[], alloc: HeapAllocator) {
    return outLens.map((len, i) => {
      if (len) {
        return this.getMemorySlice(outPtrs[i], outPtrs[i] + len);
      }
      const slice = this.getMemorySlice(outPtrs[i], outPtrs[i] + 4);
      const ptr = new DataView(slice.buffer, slice.byteOffset, slice.byteLength).getUint32(0, true);

      // Add our heap buffer to the dealloc list.
      alloc.addOutputPtr(ptr);

      // The length will be found in the first 4 bytes of the buffer, big endian. See to_heap_buffer.
      const lslice = this.getMemorySlice(ptr, ptr + 4);
      const length = new DataView(lslice.buffer, lslice.byteOffset, lslice.byteLength).getUint32(0, false);

      return this.getMemorySlice(ptr + 4, ptr + 4 + length);
    });
  }
}
