const ALCHEMY_API_KEY = 'JG3mOl7GCd3oU_skAHEpl7qWDsoyitZA';
const PLACEHOLDER_ADDRESS = `0x4d8152386Ce4aC935d8Cfed93Ae06077025eAd9E`;

export const SANDBOX_URL = 'http://localhost:8080';

export const ACCOUNT_ADDRESS =
  '0x0ad18d234f1867bdc7b2cac3ea675db5918cdabd5010775e8781280728df5dae';
export const ACCOUNT_KEY =
  '0x1b0b80f4e87390a5435ae2f1025c0518771eb676db3d9039a60b1ee845deda23';

export const TOKEN_ADDRESS =
  '0x00c13f15e6e64dde086aa6c349e6aac63f5c77215ed6a8a3e1a29c3231c8bd03';

// just for demo. you may wannna copy & paste this addr to manually set recipient on the app ui.
export const RECIPIENT_ADDRESS =
  '0x2c014dd1a9676bdeda6e3b4b3bfc8b511c23b39fb423ac3dfdce609a69ab40be';

export const ACCOUNT_SIGNING_PUBKEY = {
  x: [
    52, 239, 213, 45, 52, 83, 239, 207, 179, 149, 217, 180, 131, 214, 182, 193,
    0, 216, 89, 210, 83, 53, 20, 128, 155, 155, 154, 119, 238, 214, 46, 9
  ],
  y: [
    4, 172, 177, 208, 40, 154, 229, 243, 155, 90, 37, 3, 234, 41, 37, 239, 162,
    191, 143, 87, 145, 104, 9, 224, 98, 215, 221, 252, 157, 190, 162, 188
  ]
};

export default {
  primaryColor: '#1F2937',
  // Light blue gray
  backgroundColor: '#f4f4f4',
  lightTextColor: '#a0a0a0',
  redColor: '#cc5555',
  greenColor: '#55aa55',
  explorers: {
    ethereum: {
      sepolia: {
        url: 'https://eth-sepolia.blockscout.com/tx/'
      }
    },
    gnosis: {
      chiado: {
        url: 'https://gnosis.blockscout.com/tx/'
      }
    },
    celo: {
      alfajores: {
        url: 'https://explorer.celo.org/alfajores/tx'
      }
    },
    linea: {
      sepolia: {
        url: 'https://explorer.sepolia.linea.build/'
      }
    }
  },
  tokens: {
    USDC: {
      ethereum: {
        sepolia: {
          address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
          decimals: 6
        }
      },
      polygon: {
        amoy: {
          address: '0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582',
          decimals: 6
        }
      }
    }
  },
  chains: {
    ethereum: {
      sepolia: {
        rpc: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        chainId: 11155111
      }
    },
    polygon: {
      amoy: {
        rpc: 'https://rpc-amoy.polygon.technology',
        chainId: 80002
      }
    },
    scroll: {
      sepolia: {
        rpc: 'https://scroll-rpc.sepolia.io',
        chainId: 534351
      }
    },
    linea: {
      sepolia: {
        rpc: 'https://linea-sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        chainId: 59141
      }
    },
    celo: {
      alfajores: {
        rpc: 'https://alfajores-forno.celo-testnet.org',
        chainId: 44787
      }
    },
    gnosis: {
      chiado: {
        rpc: 'https://1rpc.io/gnosis',
        chainId: 10200
      }
    }
  },
  safeAddresses: {
    ethereum: {
      sepolia: PLACEHOLDER_ADDRESS
    },
    polygon: {
      amoy: PLACEHOLDER_ADDRESS
    },
    scroll: {
      sepolia: PLACEHOLDER_ADDRESS
    },
    linea: {
      sepolia: PLACEHOLDER_ADDRESS
    },
    celo: {
      alfajores: PLACEHOLDER_ADDRESS
    },
    gnosis: {
      chiado: PLACEHOLDER_ADDRESS
    }
  }
};
