import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bip39 from 'bip39';
import * as bs58 from 'bs58';
import { Web3 } from './web3';
import { KeyPairOptions } from '@mattrglobal/jsonld-signatures-bbs';

const bip32 = BIP32Factory(ecc);

export class Base58KeyPairGenerator {
  constructor(private web3: Web3) {}

  async generateBase58KeyPair(): Promise<KeyPairOptions> {
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
