import * as data from './data';

const documents: { [key: string]: object | string } = {
  'did:example:489398593#test': data.keyPairOptions,
  'did:example:489398593': data.exampleControllerDoc,
  'https://w3id.org/security/bbs/v1': data.bbsContext,
  'https://w3id.org/citizenship/v1': data.citizenVocab,
  'https://www.w3.org/2018/credentials/v1': data.credentialContext,
  'https://w3id.org/security/suites/jws-2020/v1': data.suiteContext,
};

const customDocLoader = (url: string): any => {
  const context = documents[url];

  if (context) {
    return {
      contextUrl: null,
      document: context,
      documentUrl: url,
    };
  }

  const errorMessage = `Attempted to remote load context : '${url}', please cache instead`;
  console.error(errorMessage);
  throw new Error(errorMessage);
};

export class BbsBlsSignature {
  private documentLoader: any;

  private constructor(
    private BbsBls: typeof import('@mattrglobal/jsonld-signatures-bbs'),
    private JsonLd: typeof import('jsonld-signatures'),
  ) {
    this.documentLoader = this.JsonLd.extendContextLoader(customDocLoader);
  }

  static async connect() {
    return new BbsBlsSignature(
      await import('@mattrglobal/jsonld-signatures-bbs'),
      await import('jsonld-signatures'),
    );
  }

  private async getKeyPair() {
    return new this.BbsBls.Bls12381G2KeyPair(data.keyPairOptions);
  }

  async signDocument(inputDocument: object) {
    const keyPair = await this.getKeyPair();
    console.log('Input document');
    console.log(JSON.stringify(inputDocument, null, 2));

    return this.JsonLd.sign(inputDocument, {
      suite: new this.BbsBls.BbsBlsSignature2020({ key: keyPair }),
      purpose: new this.JsonLd.purposes.AssertionProofPurpose(),
      documentLoader: this.documentLoader,
    });
  }

  async deriveProof(
    signedDocument: any,
    nameDisclosure: boolean,
    genderDisclosure: boolean,
    countryDisclosure: boolean,
  ) {
    const revealDocument = this.constructRevealDocument(
      nameDisclosure,
      genderDisclosure,
      countryDisclosure,
    );

    console.log(revealDocument);
    return this.BbsBls.deriveProof(signedDocument, revealDocument, {
      suite: new this.BbsBls.BbsBlsSignatureProof2020(),
      documentLoader: this.documentLoader,
    });
  }

  private constructRevealDocument(
    nameDisclosure: boolean,
    genderDisclosure: boolean,
    countryDisclosure: boolean,
  ) {
    return {
      ...data.revealDocumentBase,
      credentialSubject: {
        '@explicit': true,
        type: ['PermanentResident', 'Person'],
        ...(nameDisclosure ? { givenName: {}, familyName: {} } : {}),
        ...(genderDisclosure ? { gender: {} } : {}),
        ...(countryDisclosure ? { birthCountry: {} } : {}),
      },
    };
  }
}
