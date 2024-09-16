export type WebassemblyInstance<Exports extends object> = {
    readonly exports: Exports;
};
type WebAssemblyMemoryParams = {
    readonly initial: number;
};
export declare class Memory {
    readonly __initial: WebAssemblyMemoryParams['initial'] | undefined;
    constructor(params: WebAssemblyMemoryParams);
}
export type WebAssemblyEnv = {
    readonly memory?: Memory;
};
export type Imports = Record<string, Function | ArrayBuffer>;
type ImportsMap = Omit<{
    readonly [key: string]: Imports | WebAssemblyEnv;
}, 'env'>;
export type WebAssemblyImportObject = ImportsMap & {
    readonly env?: WebAssemblyEnv;
};
type WebAssemblyDefaultExports = {
    readonly memory?: ArrayBuffer;
};
export type WebassemblyInstantiateResult<Exports extends object> = {
    readonly instance: WebassemblyInstance<Exports & WebAssemblyDefaultExports>;
};
export declare function instantiate<Exports extends object>(bufferSource: Uint8Array | ArrayBuffer | number, maybeImportObject?: WebAssemblyImportObject | undefined): Promise<WebassemblyInstantiateResult<Exports>>;
export {};
//# sourceMappingURL=index.d.ts.map