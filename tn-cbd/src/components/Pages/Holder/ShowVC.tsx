import React from "react";
import { Mumbai } from "@usedapp/core";
import { Conditions, ConditionSet } from "@nucypher/nucypher-ts";

function ShowVC({ depStrategy, setConditionSets, setEncryptedMessages }: any) {
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

  const showVC = () => {
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
      "{}",
      conditionSetBronze
    );
    const encryptedSilver = encrypter.encryptMessage(
      "{}",
      conditionSetSilver
    );
    const encryptedGold = encrypter.encryptMessage(
      "{}",
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
    <div>
      <h2>Show VC</h2>
    <div>
      <label htmlFor="sbt-address">SBT address</label>
      <input id="sbt-address" />
    </div>
    <button className="cbd-button" onClick={showVC}>
      Show VC
    </button>
    <div>
      <p>
        <label htmlFor="body">Decrypted content</label>
        <div id="content">content</div>
      </p>
    </div>
  </div>
  );
}

export default ShowVC;
