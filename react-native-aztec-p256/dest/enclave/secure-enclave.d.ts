export declare function isDERPubKey(pubKeyHex: string): boolean;
export declare function formatPublicKey(pubKeyHex: string): {
    x: number[];
    y: number[];
};
export declare function parseAndNormalizeSig(derSig: string): number[];
export declare function getPublicKey(): Promise<{
    x: number[];
    y: number[];
}>;
export declare function generateKeyPair(): Promise<{
    x: number[];
    y: number[];
}>;
export declare function deleteKeyPair(): Promise<void>;
export declare function signMessage(data: string): Promise<number[]>;
export declare function parseMessage(data: string): Promise<number[]>;
