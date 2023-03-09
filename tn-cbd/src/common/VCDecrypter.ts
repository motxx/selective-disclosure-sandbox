import type { PolicyMessageKit } from "@nucypher/nucypher-ts";
import { ethers } from "ethers";
import { SBTContract, VCDecryptionKit } from "./SBTContract";

export class VCDecrypter {
  constructor (private contractAddress: string) {}

  decryptVC = async (tokenId: number) => {
    const sbtContract = await SBTContract.connectTo(this.contractAddress);
    if (!sbtContract) {
      return;
    }
    const decryptionKit = await sbtContract.retrieveVCDecryptionKit(tokenId);
    if (!decryptionKit) {
      console.log("failed to get decryption kit");
      return;
    }
    return await this.decrypt(decryptionKit);
  };

  private decrypt = async (decryptionKit: VCDecryptionKit) => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const conditionContext = decryptionKit.conditionSet.buildContext(web3Provider);
    const retrievedMessages = await decryptionKit.decrypter.retrieve(
      [decryptionKit.encryptedMessage],
      conditionContext
    );
    let decryptedMessages = "";
    retrievedMessages.forEach(
      (mk: PolicyMessageKit) => {
        if (mk.isDecryptableByReceiver()) {
          const decryptedMessage = decryptionKit.decrypter.decrypt(mk);
          const decoded = new TextDecoder().decode(decryptedMessage);
          decryptedMessages += decoded;
        }
      }
    );
    return decryptedMessages;
  };
}
