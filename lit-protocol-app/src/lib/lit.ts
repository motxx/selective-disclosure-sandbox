import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { EncryptedText } from './types';

const chain = 'mumbai';

// Checks if the user has at least 0.1 MATIC
const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain,
    method: 'eth_getBalance',
    parameters: [':userAddress', 'latest'],
    returnValueTest: {
      comparator: '>=',
      value: '100000000000000000', // 0.1 MATIC
    },
  },
];

class Lit {
  public litNodeClient;

  constructor(options: any) {
    this.litNodeClient = new LitJsSdk.LitNodeClient(options);
  }

  async connect() {
    try {
      await this.litNodeClient.connect();
    } catch (error) {
      console.error(`Failed to connect to Lit: ${error}`);
    }
  }

  async encryptText(text: string): Promise<EncryptedText> {
    if (!this.litNodeClient) {
      await this.connect();
    }
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      text,
    );

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions: accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });

    return {
      encryptedString: encryptedString,
      symmetricKey: LitJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        'base16',
      ),
    };
  }

  async decryptText(encryptedText: EncryptedText) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions: accessControlConditions,
      toDecrypt: encryptedText.symmetricKey,
      chain,
      authSig,
    });

    return await LitJsSdk.decryptString(
      encryptedText.encryptedString,
      symmetricKey,
    );
  }
}

const lit = new Lit({ alertWhenUnauthorized: false });
lit.connect();

export { lit };
