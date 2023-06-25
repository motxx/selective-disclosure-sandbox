import { KeyPairOptions } from '@mattrglobal/jsonld-signatures-bbs';
import { Base58KeyPairGenerator } from './base58-key-pair-generator';
import { BbsBlsSignature } from './credentials-bbs/bbs-bls-signature';
import { Web3 } from './web3';

export class CredentialsBbsBls {
  private constructor(
    private bbsBls: BbsBlsSignature,
    private keyPairGenerator: Base58KeyPairGenerator,
  ) {}

  static async connect() {
    const bbsBls = await BbsBlsSignature.connect();
    const web3 = await Web3.connectWallet();
    const keyPairGenerator = new Base58KeyPairGenerator(web3);
    return new CredentialsBbsBls(bbsBls, keyPairGenerator);
  }

  async generateMockKeyPairOptions(): Promise<KeyPairOptions> {
    const keyPair = await this.keyPairGenerator.generateBase58KeyPair();
    return {
      id: 'did:example:489398593#test',
      controller: 'did:example:489398593',
      privateKeyBase58: keyPair.privateKey,
      publicKeyBase58: keyPair.publicKey,
    };
  }

  async signDocument(inputDocument: object, keyPair: KeyPairOptions) {
    const signedDocument = await this.bbsBls.signDocument(
      inputDocument,
      keyPair,
    );
    console.log(JSON.stringify(signedDocument));
    return signedDocument;
  }

  async deriveProof(
    signedDocument: any,
    nameDisclosure: boolean,
    genderDisclosure: boolean,
    countryDisclosure: boolean,
  ) {
    return this.bbsBls.deriveProof(
      signedDocument,
      nameDisclosure,
      genderDisclosure,
      countryDisclosure,
    );
  }

  async verifyProof(presentation: any) {
    const res = await this.bbsBls.verifyProof(presentation).catch((e) => {
      console.error(e);
      return false;
    });
    return res;
  }
}
