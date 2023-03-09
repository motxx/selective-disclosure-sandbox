import React, { useState } from "react";
import { VCEncrypter } from "../../../common/VCEncrypter";
import type { DeployedStrategy } from "@nucypher/nucypher-ts";

function IssueVC({ depStrategy }: { depStrategy: DeployedStrategy | null }) {
  const [sbtAddress, setSBTAddress] = useState("0x36DC0ae7272556B998a30A8996C62bb966B178c5");
  const [toAddress, setToAddress] = useState("0x");
  const [message, setMessage] = useState("secret message");
  const [currentTokenId, setCurrentTokenId] = useState(-1);

  const issueVC = async (contractAddress: string, to: string, message: string) => {
    if (!depStrategy || !depStrategy.encrypter) {
      console.log("depStrategy not initialized");
      return;
    }
    const tokenId = await
      new VCEncrypter(depStrategy, contractAddress)
      .issueVC(to, message);
    if (!tokenId) {
      console.log("failed to mint");
      return;
    }
    setCurrentTokenId(tokenId);
  };

  return (
    <div>
      <div>
        <div><label htmlFor="to">To</label></div>
        <input id="to" value={toAddress} onChange={e => setToAddress(e.target.value)} />
      </div>
      <div>
        <div><label htmlFor="message">Message</label></div>
        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} />
      </div>
      <button className="cbd-button" onClick={() => issueVC(sbtAddress, toAddress, message)}>
        Issue VC
      </button>
      <div>
        <div><label htmlFor="sbt-address">SBT address</label></div>
        <input
          id="sbt-address"
          value={sbtAddress}
          onChange={e => setSBTAddress(e.target.value)}
        />
      </div>
      <div>
        <div><label htmlFor="tokenId">Token Id</label></div>
        <p>{currentTokenId}</p>
      </div>
    </div>
  );
}

export default IssueVC;
