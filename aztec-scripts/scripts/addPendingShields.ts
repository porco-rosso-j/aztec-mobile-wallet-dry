import {
  AztecAddress,
  ExtendedNote,
  Fr,
  Note,
  TxHash,
  createPXEClient
} from '@aztec/aztec.js';
import { PXE_URL } from './mintToken';
import { TokenContract } from '@aztec/noir-contracts.js/Token';

export async function addPendingShieldNoteToPXE(
  from: string,
  token: string,
  amount: bigint,
  secretHash: string,
  txHash: string
) {
  // const aztec = await import('@aztec/aztec.js');
  // const pxe = aztec.createPXEClient(PXE_URL);
  const pxe = createPXEClient(PXE_URL);
  // const { ExtendedNote, Note, Fr, AztecAddress, TxHash } = await import(
  //   '@aztec/aztec.js'
  // );
  // const { TokenContract } = await import('@aztec/noir-contracts.js/Token');

  const note = new Note([new Fr(BigInt(amount)), Fr.fromString(secretHash)]);

  const extendedNote = new ExtendedNote(
    note,
    AztecAddress.fromString(from),
    AztecAddress.fromString(token),
    TokenContract.storage.pending_shields.slot,
    TokenContract.notes.TransparentNote.id,
    TxHash.fromString(txHash)
  );

  console.log('note: ', note);
  await pxe.addNote(extendedNote);
}
