import { CredentialsBbsBls } from '~/lib/credentials-bbs-bls';

export class Holder {
  credential: object | null = null;
  presentation: object | null = null;
  signature: string | null = null;

  fetchCredential = async (credentialName: string) => {
    this.credential = await this.load(credentialName);
    return this.credential;
  };

  createPresentation = async (
    nameDisclosure: boolean,
    genderDisclosure: boolean,
    countryDisclosure: boolean,
  ) => {
    if (!this.credential) {
      return null;
    }
    const bbsBls = await CredentialsBbsBls.connect();
    const proof = await bbsBls.deriveProof(
      this.credential,
      nameDisclosure,
      genderDisclosure,
      countryDisclosure,
    );
    console.log(proof);
    this.presentation = proof;
    return this.presentation;
  };

  load = async (credentialName: string) => {
    const key = `signedDocument-${credentialName}`;
    const serializedValue = window.localStorage.getItem(key);
    if (serializedValue) {
      return JSON.parse(serializedValue);
    }
    return null;
  };
}
