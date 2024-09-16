
import { BarretenbergWasmMain } from './barretenberg_wasm_main/index.js';
import { fetchCode } from './fetch_code/index.js';


export async function fetchModuleAndThreads(desiredThreads?: number) {
  const code = await fetchCode();

  console.log('code len: ', code.byteLength)

  if (code.byteLength === 0) {
    throw new Error('Failed to fetchCode.');
  }
  // const module = await WebAssembly.compile(code);
  // return { module };
  return { wasmFile: code};
}

export class BarretenbergWasm extends BarretenbergWasmMain {
  /**
   * Construct and initialize BarretenbergWasm within a Worker. Return both the worker and the wasm proxy.
   * Used when running in the browser, because we can't block the main thread.
   */
  public static async new(desiredThreads?: number) {

    // const wasm = new BarretenbergWasmMain();
    // await wasm.init(module);
    const wasm = new BarretenbergWasmMain();
    const { wasmFile } = await fetchModuleAndThreads(1);
    console.log('wasmFile len: ', wasmFile.byteLength)
    
    await wasm.init(wasmFile);
    return { wasm };
  }
}
