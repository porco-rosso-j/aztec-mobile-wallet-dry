import { type CompleteAddress } from '@aztec/circuit-types';
import { DefaultAccountContract } from '@aztec/accounts/defaults';
import { AuthWitnessProvider } from '@aztec/aztec.js';
/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 */
export declare class EcdsaAccountContract extends DefaultAccountContract {
    private pubkey_x;
    private pubkey_y;
    constructor(pubkey_x: Buffer, pubkey_y: Buffer);
    getDeploymentArgs(): Promise<Buffer[]>;
    getAuthWitnessProvider(_address: CompleteAddress): AuthWitnessProvider;
}
