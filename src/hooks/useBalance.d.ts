export declare const PXE_URL = "http://localhost:8080";
export declare const useBalance: (address: string, token: string) => {
    balance: number[];
};
export declare function _getBalance(address: string, token: string): Promise<[number, number]>;
