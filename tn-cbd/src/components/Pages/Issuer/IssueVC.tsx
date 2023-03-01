import React from "react";
import { Mumbai } from "@usedapp/core";
import { Conditions, ConditionSet } from "@nucypher/nucypher-ts";

function IssueVC({ depStrategy, setConditionSets, setEncryptedMessages }: any) {
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

  const issueVC = () => {
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
    <div>
      <div><label htmlFor="to">To</label></div>
      <input id="to" />
    </div>
    <div>
      <div><label htmlFor="content">Content</label></div>
      <textarea id="content" />
    </div>
    <button className="cbd-button" onClick={issueVC}>
      Issue VC
    </button>
    <div>
      <p>
        <label htmlFor="sbt-address">SBT address</label>
        <div>0x</div>
      </p>
    </div>
    <div>
      <p>
        <label htmlFor="vc-uid">VC UID</label>
        <div>uid xxx</div>
      </p>
    </div>
  </div>
  );
}

export default IssueVC;
