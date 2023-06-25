import { CredentialsBbsBls } from '~/lib/credentials-bbs-bls';

export const issueCredential = async (
  holderAddress: string,
  credentialName: string,
  inputDocument: object,
) => {
  console.log(inputDocument);
  const bbsBls = await CredentialsBbsBls.connect();
  const signedDocument = await bbsBls.signDocument(inputDocument);
  await save(credentialName, signedDocument);
};

// TODO: S3やIPFS/Arweaveに保存する
const save = async (credentialName: string, signedDocument: any) => {
  const key = `signedDocument-${credentialName}`;
  const serializedValue = JSON.stringify(signedDocument);
  window.localStorage.setItem(key, serializedValue);
};
