import { randomBytes } from '../../random/index.js';
// import * as WebAssembly from 'react-native-webassembly';

/**
 * Base implementation of BarretenbergWasm.
 * Contains code that is common to the "main thread" implementation and the "child thread" implementation.
 * Updated for React Native compatibility and replaced logger with console.log.
 */
export class BarretenbergWasmBase {
  protected memStore: { [key: string]: Uint8Array } = {};
  protected memory!: WebAssembly.Memory | undefined;
  
  // @ts-ignore
  protected instance!: WebAssembly.WebassemblyInstance<Record<string, any>>;

  protected getImportObj() {
    const importObj = {
      wasi_snapshot_preview1: {
        random_get: (out: any, length: number) => {
          out = out >>> 0;
          const randomData = randomBytes(length);
          const mem = this.getMemory();
          mem.set(randomData, out);
        },
        clock_time_get: (a1: number, a2: number, out: number) => {
          out = out >>> 0;
          const ts = BigInt(new Date().getTime()) * 1000000n;
          const view = new DataView(this.getMemory().buffer);
          view.setBigUint64(out, ts, true);
        },
        proc_exit: () => {
          console.log('PANIC: proc_exit was called.');
        },
      },
      env: {
        memory: this.memory,
        logstr: (addr: number) => {
          const str = this.stringFromAddress(addr);
          const mem = this.getMemory();
          console.log(`${str} (mem: ${(mem.length / (1024 * 1024)).toFixed(2)} MiB)`);
        },
        get_data: (keyAddr: number, outBufAddr: number) => {
          const key = this.stringFromAddress(keyAddr);
          outBufAddr = outBufAddr >>> 0;
          const data = this.memStore[key];
          if (!data) return;
          this.writeMemory(outBufAddr, data);
        },
        set_data: (keyAddr: number, dataAddr: number, dataLength: number) => {
          const key = this.stringFromAddress(keyAddr);
          dataAddr = dataAddr >>> 0;
          this.memStore[key] = this.getMemorySlice(dataAddr, (dataAddr) + dataLength);
        },
      },
    };
    /* eslint-enable camelcase */

    // @ts-ignore
    return importObj as WebAssembly.WebAssemblyImportObject;
  }

  public exports(): any {
    return this.instance.exports;
  }

  /**
   * When returning values from the WASM, use >>> operator to convert signed representation to unsigned representation.
   */
  public call(name: string, ...args: any) {
    if (!this.exports()[name]) {
      throw new Error(`WASM function ${name} not found.`);
    }
    try {
      return this.exports()[name](...args) >>> 0;
    } catch (err: any) {
      const message = `WASM function ${name} aborted, error: ${err}`;
      console.log(message);
      console.log(err.stack);
      throw err;
    }
  }

  public memSize() {
    return this.getMemory().length;
  }

  /**
   * Returns a copy of the data, not a view.
   */
  public getMemorySlice(start: number, end: number) {
    return this.getMemory().subarray(start, end).slice();
  }

  public writeMemory(offset: number, arr: Uint8Array) {
    const mem = this.getMemory();
    mem.set(arr, offset);
  }

  // PRIVATE METHODS

  private getMemory() {
    // return new Uint8Array(this.instance.exports.memory.buffer);
    return new Uint8Array(this.instance.exports.memory);
  }

  private stringFromAddress(addr: number) {
    addr = addr >>> 0;
    const m = this.getMemory();
    let i = addr;
    for (; m[i] !== 0; ++i);
    const textDecoder = new TextDecoder('ascii');
    return textDecoder.decode(m.slice(addr, i));
  }
}
