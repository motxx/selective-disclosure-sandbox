import { NFTCollection, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Web3 } from "./Web3";
import { ConditionSet, MessageKit, tDecDecrypter } from "@nucypher/nucypher-ts";
import { fromHexString } from "./Utils";
import { VCSBT__factory } from "../../types/ethers-contracts";
import type { ethers } from "ethers";

export type VCDecryptionKit = {
  encryptedMessage: MessageKit;
  decrypter: tDecDecrypter;
  conditionSet: ConditionSet;
};

export class SBTContract {
  private constructor(
    private contract: NFTCollection,
    private signer: ethers.providers.JsonRpcSigner,
    public contractAddress: string
  ) {}

  static connectTo = async (contractAddress: string) => {
    const web3 = new Web3();
    const signer = await web3.getSigner();
    if (!signer) {
      console.log("signer not defined");
      return;
    }
    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(contractAddress, "nft-collection");
    return new SBTContract(contract, signer, contractAddress);
  };

  mint = async (to: string, encryptedMessage: string, decrypter: string, conditionSet: string) => {
    const res = await this.contract.mintTo(to, { name: "permissioned nft", encryptedMessage, decrypter, conditionSet });
    return res.id;
  };

  nextTokenIdToMint = async () => {
    return await this.contract.erc721.nextTokenIdToMint();
  };

  issueDisclosure = async (to: string, tokenId: number, blockHeight: number) => {
    const contractAddress = await this.contract.getAddress();
    const sbt = VCSBT__factory.connect(contractAddress, this.signer);
    const signerAddress = await this.signer.getAddress();
    const tx = await sbt.issueDisclosure(signerAddress, to, tokenId, blockHeight);
    await tx.wait();
  };

  getDisclosure = async (from: string, to: string, tokenId: number) => {
    const address = await this.contract.getAddress();
    const sbt = VCSBT__factory.connect(address, this.signer);
    return await sbt.disclosure(from, to, tokenId);
  };

  retrieveVCDecryptionKit = async (tokenId: number): Promise<VCDecryptionKit | null> => {
    if (!this.contract) {
      console.log("failed to getContract");
      return null;
    }
    const metadata = await this.contract.erc721.getTokenMetadata(tokenId);
    if (!metadata) {
      console.log("failed to get metadata");
      return null;
    }
    const encryptedMessageEncoded = metadata.encryptedMessage as string;
    const decrypterJSON = metadata.decrypter as string;
    const conditionSetJSON = metadata.conditionSet as string;
    const encryptedMessage = MessageKit.fromBytes(fromHexString(encryptedMessageEncoded));
    const decrypter = tDecDecrypter.fromJSON(decrypterJSON);
    const conditionSet = ConditionSet.fromJSON(conditionSetJSON);
    return {
      encryptedMessage,
      decrypter,
      conditionSet,
    };
  };
}
