import { BarretenbergWasmMain } from './barretenberg_wasm_main/index.js';
export declare function fetchModuleAndThreads(desiredThreads?: number): Promise<{
    wasmFile: any;
}>;
export declare class BarretenbergWasm extends BarretenbergWasmMain {
    /**
     * Construct and initialize BarretenbergWasm within a Worker. Return both the worker and the wasm proxy.
     * Used when running in the browser, because we can't block the main thread.
     */
    static new(desiredThreads?: number): Promise<{
        wasm: BarretenbergWasmMain;
    }>;
}
//# sourceMappingURL=index.d.ts.map