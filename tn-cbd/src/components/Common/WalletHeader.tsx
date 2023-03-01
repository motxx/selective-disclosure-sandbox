import React from "react";
import { useEthers } from "@usedapp/core";

function WalletHeader({ pageTitle }: any) {
  const { activateBrowserWallet, account } = useEthers();

  function shortenAddress(address: string | undefined) {
    if (address && address.length === 42) {
      return `${address.slice(0, 5)}...${address.slice(38)}`;
    }
    return "not connected";
  }

  return (
    <div className="cbd-header">
      <h2>{ pageTitle }</h2>
      <div className="row">
        <div className="column">
          <div>
            <button className="cbd-button" onClick={activateBrowserWallet}>
              Connect Wallet
            </button>
          </div>
        </div>
        <div className="column">
          <div style={{ textAlign: "right" }}>
            <span>
              Account: <b>{shortenAddress(account)} </b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletHeader;
