/**
 * Base implementation of BarretenbergWasm.
 * Contains code that is common to the "main thread" implementation and the "child thread" implementation.
 * Updated for React Native compatibility and replaced logger with console.log.
 */
export declare class BarretenbergWasmBase {
    protected memStore: {
        [key: string]: Uint8Array;
    };
    protected memory: WebAssembly.Memory | undefined;
    protected instance: WebAssembly.WebassemblyInstance<Record<string, any>>;
    protected getImportObj(): WebAssembly.WebAssemblyImportObject;
    exports(): any;
    /**
     * When returning values from the WASM, use >>> operator to convert signed representation to unsigned representation.
     */
    call(name: string, ...args: any): number;
    memSize(): number;
    /**
     * Returns a copy of the data, not a view.
     */
    getMemorySlice(start: number, end: number): Uint8Array;
    writeMemory(offset: number, arr: Uint8Array): void;
    private getMemory;
    private stringFromAddress;
}
//# sourceMappingURL=index.d.ts.map