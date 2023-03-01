import React from "react";
import { Mumbai } from "@usedapp/core";
import { Conditions, ConditionSet } from "@nucypher/nucypher-ts";

function Viewer({ depStrategy, setConditionSets, setEncryptedMessages }: any) {
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

  return (
    <div>
    <h2>Viewer</h2>
    <div>
      <p>
        <label htmlFor="holder">Holder address</label>
        <div>0x</div>
      </p>
    </div>
    <div>
      <p>
        <label htmlFor="vc-uid">VC UID</label>
        <div>uid xxx</div>
      </p>
    </div>
    <div>
      <p>
        <label htmlFor="body">Decrypted content</label>
        <div id="content">content</div>
      </p>
    </div>
  </div>
  );
}

export default Viewer;
