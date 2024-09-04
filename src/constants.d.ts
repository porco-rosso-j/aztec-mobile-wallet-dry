declare const _default: {
    primaryColor: string;
    backgroundColor: string;
    lightTextColor: string;
    redColor: string;
    greenColor: string;
    explorers: {
        ethereum: {
            sepolia: {
                url: string;
            };
        };
        gnosis: {
            chiado: {
                url: string;
            };
        };
        celo: {
            alfajores: {
                url: string;
            };
        };
        linea: {
            sepolia: {
                url: string;
            };
        };
    };
    tokens: {
        USDC: {
            ethereum: {
                sepolia: {
                    address: string;
                    decimals: number;
                };
            };
            polygon: {
                amoy: {
                    address: string;
                    decimals: number;
                };
            };
        };
    };
    chains: {
        ethereum: {
            sepolia: {
                rpc: string;
                chainId: number;
            };
        };
        polygon: {
            amoy: {
                rpc: string;
                chainId: number;
            };
        };
        scroll: {
            sepolia: {
                rpc: string;
                chainId: number;
            };
        };
        linea: {
            sepolia: {
                rpc: string;
                chainId: number;
            };
        };
        celo: {
            alfajores: {
                rpc: string;
                chainId: number;
            };
        };
        gnosis: {
            chiado: {
                rpc: string;
                chainId: number;
            };
        };
    };
    safeAddresses: {
        ethereum: {
            sepolia: string;
        };
        polygon: {
            amoy: string;
        };
        scroll: {
            sepolia: string;
        };
        linea: {
            sepolia: string;
        };
        celo: {
            alfajores: string;
        };
        gnosis: {
            chiado: string;
        };
    };
};
export default _default;
