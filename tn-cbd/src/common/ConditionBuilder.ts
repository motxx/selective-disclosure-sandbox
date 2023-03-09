import { Condition, ConditionSet, Conditions, Operator } from "@nucypher/nucypher-ts";
import { Mumbai } from "@usedapp/core";

export class ConditionBuilder {
  static buildNFTOwnershipConditionSet = (contractAddress: string, tokenId: number, authority: string) => {
    return new ConditionSet([
      new Conditions.Condition({
        contractAddress,
        standardContractType: 'ERC721',
        chain: Mumbai.chainId,
        method: 'ownerOf',
        parameters: [tokenId],
        returnValueTest: {
          comparator: '==',
          value: ':userAddress',
        },
      }),
      Operator.OR(),
      new Conditions.Condition({
        contractAddress,
        method: 'isDisclosureValid',
        parameters: [authority, ':userAddress', tokenId],
        functionAbi: {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'isDisclosureValid',
          outputs: [
            {
              internalType: 'uint64',
              name: 'blockHeight',
              type: 'uint64',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        chain: Mumbai.chainId,
        returnValueTest: {
          comparator: '==',
          value: true,
        },
      })
    ]);
  };

  static buildDisclosureConditionSet = (
    contractAddress: string,
    tokenId: number,
    expirationBlockHeight: number,
  ) => {
    return new ConditionSet([
      new Conditions.Condition({
        contractAddress: '',
        standardContractType: '',
        chain: Mumbai.chainId,
        method: 'timelock',
        returnValueTest: {
          comparator: '<',
          value: expirationBlockHeight,
        },
      }),
      Operator.AND(),
      new Conditions.Condition({
        contractAddress,
        standardContractType: 'ERC721',
        chain: Mumbai.chainId,
        method: 'ownerOf',
        parameters: [tokenId],
        returnValueTest: {
          comparator: '==',
          value: ':userAddress',
        },
      })
      /*
      new Conditions.Condition({
        contractAddress,
        method: 'getDisclosure',
        parameters: [sbtHolder, ':userAddress', tokenId],
        functionAbi: {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'getDisclosure',
          outputs: [
            {
              internalType: 'uint64',
              name: 'blockHeight',
              type: 'uint64',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        chain: Mumbai.chainId,
        returnValueTest: {
          comparator: '>',
          value: 0,
        },
      })
      */
    ]);
  };
}
