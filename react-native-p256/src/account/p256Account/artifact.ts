import { type NoirCompiledContract, loadContractArtifact } from '@aztec/aztec.js';

import EcdsaAccountContractJson from '../ecdsa_r1_account_contract-EcdsaAccount.json' assert { type: 'json' };

export const EcdsaAccountContractArtifact = loadContractArtifact(EcdsaAccountContractJson as unknown as NoirCompiledContract);
