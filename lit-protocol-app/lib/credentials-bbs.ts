import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bip39 from 'bip39';
import * as bs58 from 'bs58';
import { CredentialKeyPair } from './types/credentials';
import { Web3 } from './web3';

const bip32 = BIP32Factory(ecc);

export class CredentialsBBS {
  constructor(private web3: Web3) {}

  async generateMockIdentityObject(keyPair: CredentialKeyPair) {
    return {
      id: 'did:example:489398593#test',
      controller: 'did:example:489398593',
      ...keyPair,
    };
  }

  async generateBase58KeyPair(): Promise<CredentialKeyPair> {
    const message =
      'BASE58 PRIVATE KEY SEED GENERATOR. DO NOT PUBLISH DERIVED SIGNATURE!';
    const seedPhrase = await this.web3.sign(message);
    const mnemonic = bip39.entropyToMnemonic(seedPhrase);
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const master = bip32.fromSeed(seed);
    const keyPair = master.derivePath('m/0/0');
    if (!keyPair.privateKey) {
      throw new Error('Private key not found');
    }
    if (!keyPair.publicKey) {
      throw new Error('Public key not found');
    }
    return {
      privateKeyBase58: bs58.encode(keyPair.privateKey),
      publicKeyBase58: bs58.encode(keyPair.publicKey),
    };
  }
}
