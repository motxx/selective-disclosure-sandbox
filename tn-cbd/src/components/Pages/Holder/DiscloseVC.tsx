import React, { useState, VFC } from "react";
import Datetime from "react-datetime";
import { Mumbai } from "@usedapp/core";
import { Conditions, ConditionSet } from "@nucypher/nucypher-ts";

import "react-datetime/css/react-datetime.css";

const DiscloseVC: VFC = ({ depStrategy, setConditionSets, setEncryptedMessages }: any) => {
  const [expirationDatetime, setExpirationDatetime] = useState(new Date());

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

  const discloseVC = () => {
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
      <h2>Disclose VC</h2>
    <div>
      <div><label htmlFor="to">To</label></div>
      <input id="to" />
    </div>
    <div>
      <div><label htmlFor="sbt-address">SBT address</label></div>
      <input id="sbt-address" />
    </div>
    <div>
      <div><label>Expiration Datetime</label></div>
      <Datetime value={expirationDatetime} onChange={(datetime) => setExpirationDatetime(datetime)} />
    </div>
    <button className="cbd-button" onClick={discloseVC}>
      Disclose VC
    </button>
  </div>
  );
};

export default DiscloseVC;
