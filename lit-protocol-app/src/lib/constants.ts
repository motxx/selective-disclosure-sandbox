import type { UnifiedAccessControlConditions } from '@lit-protocol/types';

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

export const chain = 'mumbai';
export const defaultContract = '0x69491b8bcb50063c832a09dfae71202090ff6338';

export const createAccessControlConditions = (
  contractAddress: string,
): UnifiedAccessControlConditions => {
  return [
    // Check if the user is a holder
    {
      conditionType: 'evmContract',
      contractAddress,
      functionName: 'ownerOf',
      functionParams: [':userAddress'],
      functionAbi: {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
      },
      chain,
      returnValueTest: {
        key: '',
        comparator: '>=',
        value: '1',
      },
    },
    { operator: 'or' },
    // Check if the user is an issuer
    {
      conditionType: 'evmContract',
      contractAddress,
      functionName: 'ownerOf',
      functionParams: [],
      functionAbi: {
        type: 'function',
        name: 'getIssuer',
        stateMutability: 'view',
        inputs: [],
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
      },
      chain,
      returnValueTest: {
        key: '',
        comparator: '=',
        value: ':userAddress',
      },
    },
  ];
};
