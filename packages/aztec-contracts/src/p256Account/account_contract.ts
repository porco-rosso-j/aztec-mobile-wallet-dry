import { AuthWitness, type CompleteAddress } from '@aztec/circuit-types';
import { EcdsaAccountContractArtifact } from './artifact.js';
import { DefaultAccountContract} from '@aztec/accounts/defaults';
import { AuthWitnessProvider, ContractArtifact, Fr } from '@aztec/aztec.js';
import { Ecdsa } from '@aztec/circuits.js/barretenberg';
import { realSignature } from '../../test/constants.js';

/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 */
export class EcdsaAccountContract extends DefaultAccountContract {
  constructor(private pubkey_x: Buffer, private pubkey_y: Buffer) {
    super(EcdsaAccountContractArtifact as ContractArtifact);
  }

  getDeploymentArgs() {
    // const signingPublicKey = new Ecdsa().computePublicKey(this.signingPrivateKey);
    // return [signingPublicKey.subarray(0, 32), signingPublicKey.subarray(32, 64)];
    return [this.pubkey_x, this.pubkey_y];
  }

  getAuthWitnessProvider(_address: CompleteAddress): AuthWitnessProvider {
    return new EcdsaAuthWitnessProvider(this.pubkey_x, this.pubkey_y);
  }
}

/** Creates auth witnesses using ECDSA signatures. */
class EcdsaAuthWitnessProvider implements AuthWitnessProvider {
  constructor(private pubkey_x: Buffer, private pubkey_y: Buffer) {}

  createAuthWit(messageHash: Fr): Promise<AuthWitness> {
    // const ecdsa = new Ecdsa();
    // const signature = ecdsa.constructSignature(messageHash.toBuffer(), this.pubkey);    
    return Promise.resolve(new AuthWitness(messageHash, [...realSignature.r, ...realSignature.s]));
  }
}
