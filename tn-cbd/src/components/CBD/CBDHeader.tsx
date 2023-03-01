import React from "react";
import { useState } from "react";
import { useEthers } from "@usedapp/core";
import StrategyBuilder from "./StrategyBuilder";
import Encrypt from "./Encrypt";
import Decrypt from "./Decrypt";

function CBDHeader({ setDecryptedMessages }: any) {
  const [depStrategy, setDepStrategy] = useState("null");
  const [depStrategyStatus, setDepStrategyStatus] = useState("not deployed");
  const [conditionSets, setConditionSets] = useState([]);
  const [encryptedMessages, setEncryptedMessages] = useState([]);
  const [decMessagesStatus, setDecMessagesStatus] = useState("not decrypted");
  const { activateBrowserWallet, deactivate, account } = useEthers();

  function shortenAddress(address: string | undefined) {
    if (address && address.length === 42) {
      return `${address.slice(0, 5)}...${address.slice(38)}`;
    }
    return "not connected";
  }

  function showEncrypted() {
    return encryptedMessages.length !== 0 ? "encrypted" : "not ready";
  }

  return (
    <div className="cbd-header">
      <div className="row">
        <div className="column">
          <div>
            <button className="cbd-button" onClick={activateBrowserWallet}>
              Step 1. Connect Wallet
            </button>
          </div>
          <div>
            <StrategyBuilder
              setDepStrategy={setDepStrategy}
              setDepStrategyStatus={setDepStrategyStatus}
            />
          </div>
          <div>
            <Encrypt
              depStrategy={depStrategy}
              setConditionSets={setConditionSets}
              setEncryptedMessages={setEncryptedMessages}
            />
          </div>
          <div>
            <Decrypt
              depStrategy={depStrategy}
              conditionSets={conditionSets}
              encryptedMessages={encryptedMessages}
              setDecryptedMessages={setDecryptedMessages}
              setDecMessagesStatus={setDecMessagesStatus}
            />
          </div>
        </div>
        <div className="column">
          <div style={{ textAlign: "right" }}>
            <span>
              Account: <b>{shortenAddress(account)} </b>
            </span>
            {account && (
              <span>
                <button onClick={deactivate}>Disconnect</button>
              </span>
            )}
            <div>
              Strategy: <b>{depStrategyStatus}</b>
            </div>
            <div>
              Posts encryption: <b>{showEncrypted()}</b>
            </div>
            <div>
              Posts decryption: <b>{decMessagesStatus}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CBDHeader;
