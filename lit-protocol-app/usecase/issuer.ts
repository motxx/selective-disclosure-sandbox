import { BbsBlsSignature } from '~/lib/zk-bbs/bbs-bls-signature';

export class Issuer {
  issueCredential = async (
    holderAddress: string,
    credentialName: string,
    inputDocument: object,
  ) => {
    console.log(inputDocument);
    const bbsBls = await BbsBlsSignature.connect();
    const signedDocument = await bbsBls.signDocument(inputDocument);
    await this.save(credentialName, signedDocument);
  };

  // TODO: S3やIPFS/Arweaveに保存する
  save = async (credentialName: string, signedDocument: any) => {
    const key = `signedDocument-${credentialName}`;
    const serializedValue = JSON.stringify(signedDocument);
    window.localStorage.setItem(key, serializedValue);
  };
}
