/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, Fr, loadContractArtifact, NoteSelector, } from '@aztec/aztec.js';
import EcdsaAccountContractArtifactJson from './ecdsa_r1_account_contract-EcdsaAccount.json' assert { type: 'json' };
export const EcdsaAccountContractArtifact = loadContractArtifact(EcdsaAccountContractArtifactJson);
/**
 * Type-safe interface for contract EcdsaAccount;
 */
export class EcdsaAccountContractInstance extends ContractBase {
    constructor(instance, wallet) {
        super(instance, EcdsaAccountContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, EcdsaAccountContractInstance.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet, signing_pub_key_x, signing_pub_key_y) {
        return new DeployMethod(Fr.ZERO, wallet, EcdsaAccountContractArtifact, EcdsaAccountContractInstance.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash, wallet, signing_pub_key_x, signing_pub_key_y) {
        return new DeployMethod(publicKeysHash, wallet, EcdsaAccountContractArtifact, EcdsaAccountContractInstance.at, Array.from(arguments).slice(2));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts(opts, ...args) {
        return new DeployMethod(opts.publicKeysHash ?? Fr.ZERO, opts.wallet, EcdsaAccountContractArtifact, EcdsaAccountContractInstance.at, Array.from(arguments).slice(1), opts.method ?? 'constructor');
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return EcdsaAccountContractArtifact;
    }
    static get storage() {
        return {
            public_key: {
                slot: new Fr(1n),
            }
        };
    }
    static get notes() {
        return {
            EcdsaPublicKeyNote: {
                id: new NoteSelector(2423044547),
            }
        };
    }
}
//# sourceMappingURL=EcdsaAccount.js.map