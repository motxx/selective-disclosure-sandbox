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
    // deriveProofに成功するKeyPair
    return {
      // VerificationMethodは合わせる必要がありそう.
      // TODO: この辺りを追う
      id: 'did:example:489398593#test',
      controller: 'did:example:489398593',
      // TODO: 以下がweb3から導出したものと同じ形式か確認
      privateKeyBase58: '5D6Pa8dSwApdnfg7EZR8WnGfvLDCZPZGsZ5Y1ELL9VDj',
      publicKeyBase58:
        'oqpWYKaZD9M1Kbe94BVXpr8WTdFBNZyKv48cziTiQUeuhm7sBhCABMyYG4kcMrseC68YTFFgyhiNeBKjzdKk9MiRWuLv5H4FFujQsQK2KTAtzU8qTBiZqBHMmnLF4PL7Ytu',
    };
    const result = {
      id: 'did:example:489398593#test',
      controller: 'did:example:489398593',
      privateKeyBase58: keyPair.privateKey,
      publicKeyBase58: keyPair.publicKey,
    };
    console.log('FIXME: REMOVE FROM CONSOLE', result);
    return result;
  }

  async signDocument(inputDocument: object) {
    const keyPair = await this.generateMockKeyPairOptions();
    const signedDocument = await this.bbsBls.signDocument(
      inputDocument,
      keyPair,
    );
    console.log(JSON.stringify(signedDocument));
    return signedDocument;
    /*
    const keyPair = await this.keyPairGenerator.generateBase58KeyPair();
    return this.bbsBls.signDocument(inputDocument, {
      privateKeyBase58: keyPair.privateKey,
      publicKeyBase58: keyPair.publicKey,
    });
    */
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
}
