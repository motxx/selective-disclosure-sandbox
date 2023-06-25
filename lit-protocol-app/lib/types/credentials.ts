export type CredentialKeyPair = {
  privateKeyBase58: string;
  publicKeyBase58: string;
};

export type IdentityObject = {
  id: string;
  controller: string;
} & CredentialKeyPair;
