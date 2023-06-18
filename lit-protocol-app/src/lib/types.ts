// Credential型の定義
export interface Credential {
  // Credentialのプロパティを定義する
  // 必要に応じてカスタマイズしてください
  id: string;
  issuer: string;
  // 他のプロパティ...
}

export type EncryptedText = {
  encryptedString: Blob;
  symmetricKey: string;
};
