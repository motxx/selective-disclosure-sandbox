import React, { useState } from "react";
import type { DeployedStrategy } from "@nucypher/nucypher-ts";
// import { VCEncrypter } from "../../../common/VCEncrypter";
import { SBTContract } from "../../../common/SBTContract";

function DiscloseVC({ depStrategy, disclosureMessage }: { depStrategy: DeployedStrategy | null, disclosureMessage: string | null }) {
  const [sbtAddress, setSBTAddress] = useState("0x36DC0ae7272556B998a30A8996C62bb966B178c5");
  const [toAddress, setToAddress] = useState("0x");
  const [tokenId, setTokenId] = useState(-1);
  const [expirationBlockHeight, setExpirationBlockHeight] = useState(0);

  const discloseVC = async (contractAddress: string, to: string, tokenId: number, blockHeight: number) => {
    /*
    if (!depStrategy) {
      console.log("depStrategy not defined");
      return;
    }
    if (!disclosureMessage || !disclosureMessage.length) {
      console.log("disclosureMessage not set");
      return;
    }
    const tokenId = await new VCEncrypter(depStrategy, contractAddress)
      .issueDisclosureVC(to, disclosureMessage, blockHeight);
    if (!tokenId) {
      console.log("failed to vcencrypt disclosure");
      return;
    }
    setTokenId(tokenId);
    */
    const sbtContract = await SBTContract.connectTo(contractAddress);
    if (!sbtContract) {
      console.log("failed to load contract");
      return;
    }
    await sbtContract.issueDisclosure(to, tokenId, blockHeight);
  };

  return (
    <div>
      <div>
        <div><label htmlFor="to">To</label></div>
        <input id="to" value={toAddress} onChange={e => setToAddress(e.target.value)} />
      </div>
      <div>
        <div><label htmlFor="sbt-address">SBT address</label></div>
        <input
          id="sbt-address"
          value={sbtAddress}
          onChange={e => setSBTAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Token Id</label><br />
        <input id="token-id" value={tokenId} onChange={e => setTokenId(+e.target.value)} />
      </div>
      <div>
        <div><label htmlFor="expiration-block-height">Expiration BlockHeight</label></div>
        <input id="expiration-block-height"
          value={expirationBlockHeight}
          onChange={e => setExpirationBlockHeight(+e.target.value)}
        />
      </div>
      <button className="cbd-button" onClick={() => discloseVC(sbtAddress, toAddress, tokenId, expirationBlockHeight)}>
        Disclose VC
      </button>
    </div>
  );
  /*
      <div>
        <div><label htmlFor="token-id">Disclosure tokenId</label></div>
        <p>{tokenId}</p>
      </div>
  */
};

export default DiscloseVC;
