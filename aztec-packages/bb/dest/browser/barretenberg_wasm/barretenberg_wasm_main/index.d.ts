import { BarretenbergWasmBase } from '../barretenberg_wasm_base/index.js';
/**
 * This is the "main thread" implementation of BarretenbergWasm.
 * It spawns a bunch of "child thread" implementations.
 * In a browser context, this still runs on a worker, as it will block waiting on child threads.
 */
export declare class BarretenbergWasmMain extends BarretenbergWasmBase {
    init(wasmFile: ArrayBuffer, initial?: number): Promise<void>;
    /**
     * Init as main thread. Spawn child threads.
     */
    protected getImportObj(): any;
    callWasmExport(funcName: string, inArgs: Uint8Array[], outLens: (number | undefined)[]): Uint8Array[];
    private getOutputArgs;
}
//# sourceMappingURL=index.d.ts.map