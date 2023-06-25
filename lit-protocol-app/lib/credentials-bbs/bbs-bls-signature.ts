import * as data from './data';
import { KeyPairOptions } from '@mattrglobal/jsonld-signatures-bbs';
import { verify } from 'jsonld-signatures';

/*
import * as basex from 'base-x';

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58 = basex(BASE58);
*/

// 本来オンライン上のDIDドキュメントから引っ張ってくる
const documents: { [key: string]: object | string } = {
  // 'did:example:489398593#test': data.keyPairOptions,
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

  // TODO: DIDDocumentのストレージから取得する
  if (url === 'did:example:489398593#test') {
    const serializedValue = window.localStorage.getItem(
      'issuer-keypair-options',
    );
    if (serializedValue) {
      return {
        contextUrl: null,
        document: serializedValue,
        documentUrl: url,
      };
    }
  }

  const errorMessage = `Attempted to remote load context : '${url}', please cache instead`;
  console.error(errorMessage);
  throw new Error(errorMessage);
};

export class BbsBlsSignature {
  private documentLoader: any;

  private constructor(
    private BbsBls: typeof import('@mattrglobal/jsonld-signatures-bbs'),
    private BbsSignature: typeof import('@mattrglobal/bbs-signatures'),
    private JsonLd: typeof import('jsonld-signatures'),
  ) {
    this.documentLoader = this.JsonLd.extendContextLoader(customDocLoader);
  }

  static async connect() {
    return new BbsBlsSignature(
      await import('@mattrglobal/jsonld-signatures-bbs'),
      await import('@mattrglobal/bbs-signatures'),
      await import('jsonld-signatures'),
    );
  }

  async signDocument(inputDocument: object, keyPairOptions: KeyPairOptions) {
    return this.JsonLd.sign(inputDocument, {
      suite: new this.BbsBls.BbsBlsSignature2020({
        key: this.getBlsKeyPair(keyPairOptions),
      }),
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

  async verifyProof(presentation: any) {
    console.log('presentation', presentation);
    // catchできないWasmのエラーが発生する
    // Uncaught (in promise) RuntimeError: unreachable
    // presentation.proof.proofValue = 'AB';

    const result = await this.JsonLd.verify(presentation, {
      suite: new this.BbsBls.BbsBlsSignatureProof2020(),
      purpose: new this.JsonLd.purposes.AssertionProofPurpose(),
      documentLoader: this.documentLoader,
    }).catch((e: Error) => {
      console.error(e);
      return { verified: false, error: e };
    });

    console.log('verified result', result);

    if (result.error) {
      console.error(result.error);
      return false;
    } else {
      return result.verified;
    }
  }

  private getBlsKeyPair(keyPairOptions: KeyPairOptions) {
    return new this.BbsBls.Bls12381G2KeyPair(keyPairOptions);
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

  private static getValuesExcludingKeys(obj: { [key: string]: any }): any[] {
    const excludedKeys = ['id', 'type'];
    return Object.entries(obj)
      .filter(([key]) => !excludedKeys.includes(key))
      .map(([, value]) => value);
  }

  /*
  private static base58ToUint8Array(base58Str: string): Uint8Array {
    return new Uint8Array(base58.decode(base58Str));
  }
  */

  private static base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}
