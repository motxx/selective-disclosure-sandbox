import { CredentialKeyPair } from './types/credentials';
import { Web3 } from './web3';

export class CredentialsBBS {
  constructor(private web3: Web3) {}

  async generateMockIdentityObject(keyPair: CredentialKeyPair) {
    return {
      id: 'did:example:489398593#test',
      controller: 'did:example:489398593',
      ...keyPair,
    };
  }

  async generateBase58KeyPair() {
    const message = 'base58 private key seed generator';
    const seed = await this.web3.sign(message);
  }
}
