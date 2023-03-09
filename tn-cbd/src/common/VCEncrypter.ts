import type { ConditionSet, DeployedStrategy } from "@nucypher/nucypher-ts";
import { toHexString } from "./Utils";
import { SBTContract } from "./SBTContract";
import { ConditionBuilder } from "./ConditionBuilder";

export class VCEncrypter {
  constructor (private deployedStrategy: DeployedStrategy, private contractAddress: string) {}

  issueVC = async (to: string, message: string) => {
    const sbtContract = await SBTContract.connectTo(this.contractAddress);
    if (!sbtContract) {
      console.log("cannot sbt connectTo");
      return;
    }

    const tokenId = await sbtContract.nextTokenIdToMint();
    if (!tokenId) {
      console.log("cannot get next tokenid");
      return;
    }

    const condition = ConditionBuilder.buildNFTOwnershipConditionSet(this.contractAddress, tokenId.toNumber(), to);
    const encrypted = await this.encrypt(message, condition);
    await sbtContract.mint(to, encrypted, this.deployedStrategy.decrypter.toJSON(), condition.toJson());
    return tokenId.toNumber();
  };

  issueDisclosureVC = async (
    to: string,
    message: string,
    expirationBlockHeight: number
  ) => {
    const sbtContract = await SBTContract.connectTo(this.contractAddress);
    if (!sbtContract) {
      return;
    }

    const tokenId = await sbtContract.nextTokenIdToMint();
    if (!tokenId) {
      return;
    }

    const condition = ConditionBuilder.buildDisclosureConditionSet(
      this.contractAddress,
      tokenId.toNumber(),
      expirationBlockHeight,
    );
    const encrypted = await this.encrypt(message, condition);
    await sbtContract.mint(to, encrypted, this.deployedStrategy.decrypter.toJSON(), condition.toJson());
    return tokenId.toNumber();
  };

  private encrypt = async (message: string, conditionSet: ConditionSet) => {
    const encrypter = this.deployedStrategy.encrypter;
    const encrypted = encrypter.encryptMessage(message, conditionSet);
    console.log(encrypter, conditionSet, encrypted);
    return toHexString(encrypted.toBytes());
  };
}
