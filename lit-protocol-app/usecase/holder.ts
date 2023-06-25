import { CredentialsBbsBls } from '~/lib/credentials-bbs-bls';

export const fetchCredential = async (credentialName: string) => {
  return await load(credentialName);
};

export const createPresentation = async (
  credentialName: string,
  nameDisclosure: boolean,
  genderDisclosure: boolean,
  countryDisclosure: boolean,
) => {
  const credential = await fetchCredential(credentialName);
  if (!credential) {
    return null;
  }
  const bbsBls = await CredentialsBbsBls.connect();
  const presentation = await bbsBls.deriveProof(
    credential,
    nameDisclosure,
    genderDisclosure,
    countryDisclosure,
  );
  console.log('Presentation', presentation);
  return presentation;
};

const load = async (credentialName: string) => {
  const key = `signedDocument-${credentialName}`;
  const serializedValue = window.localStorage.getItem(key);
  if (serializedValue) {
    return JSON.parse(serializedValue);
  }
  return null;
};
