import { AuthWitness } from '@aztec/circuit-types';
import { EcdsaAccountContractArtifact } from './artifact.js';
import { DefaultAccountContract } from '@aztec/accounts/defaults';
import { signMessage } from '../../enclave/secure-enclave.js';
/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 */
export class EcdsaAccountContract extends DefaultAccountContract {
    constructor(pubkey_x, pubkey_y) {
        super(EcdsaAccountContractArtifact);
        this.pubkey_x = pubkey_x;
        this.pubkey_y = pubkey_y;
    }
    async getDeploymentArgs() {
        // const signingPublicKey = new Ecdsa().computePublicKey(this.signingPrivateKey);
        // return [signingPublicKey.subarray(0, 32), signingPublicKey.subarray(32, 64)];
        return [this.pubkey_x, this.pubkey_y];
    }
    getAuthWitnessProvider(_address) {
        return new EcdsaAuthWitnessProvider();
    }
}
/** Creates auth witnesses using ECDSA signatures. */
class EcdsaAuthWitnessProvider {
    constructor() { }
    async createAuthWit(messageHash) {
        const signature = await signMessage(messageHash.toString());
        return Promise.resolve(new AuthWitness(messageHash, signature));
    }
}
//# sourceMappingURL=account_contract.js.map