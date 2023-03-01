import React from "react";
import { Mumbai } from "@usedapp/core";
import { Conditions, ConditionSet } from "@nucypher/nucypher-ts";
import {
  silverBlogPosts,
  bronzeBlogPosts,
  goldBlogPosts,
} from "../Blog/BlogData";

function Encrypt({ depStrategy, setConditionSets, setEncryptedMessages }: any) {
  const buildERC721BalanceCondConfig = (balance: number) => {
    const config = {
      contractAddress: "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b",
      standardContractType: "ERC721",
      chain: Mumbai.chainId,
      method: "balanceOf",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: ">=",
        value: balance,
      },
    };
    return config;
  };

  const encrypt = () => {
    if (!depStrategy.encrypter) return;

    setConditionSets([]);
    setEncryptedMessages([]);

    const encrypter = depStrategy.encrypter;

    const conditionSetBronze = new ConditionSet([
      new Conditions.Condition(buildERC721BalanceCondConfig(1)),
    ]);
    const conditionSetSilver = new ConditionSet([
      new Conditions.Condition(buildERC721BalanceCondConfig(2)),
    ]);
    const conditionSetGold = new ConditionSet([
      new Conditions.Condition(buildERC721BalanceCondConfig(3)),
    ]);

    const encryptedBronze = encrypter.encryptMessage(
      JSON.stringify(bronzeBlogPosts),
      conditionSetBronze
    );
    const encryptedSilver = encrypter.encryptMessage(
      JSON.stringify(silverBlogPosts),
      conditionSetSilver
    );
    const encryptedGold = encrypter.encryptMessage(
      JSON.stringify(goldBlogPosts),
      conditionSetGold
    );

    setConditionSets([
      conditionSetBronze,
      conditionSetSilver,
      conditionSetGold,
    ]);
    setEncryptedMessages([encryptedBronze, encryptedSilver, encryptedGold]);
  };

  return (
    <button className="cbd-button" onClick={encrypt}>
      Step 3. Encrypt posts
    </button>
  );
}

export default Encrypt;
