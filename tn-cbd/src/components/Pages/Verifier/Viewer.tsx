import React, { useState } from "react";
import { VCDecrypter } from "../../../common/VCDecrypter";

function Viewer() {
  const [sbtAddress, setSBTAddress] = useState("0x36DC0ae7272556B998a30A8996C62bb966B178c5");
  const [tokenId, setTokenId] = useState(0);
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const viewContent = async (contractAddress: string, tokenId: number) => {
    setDecryptedMessage("");
    const decryptedMessages = await new VCDecrypter(contractAddress).decryptVC(tokenId);
    if (!decryptedMessages) {
      console.log("failed to vcdecrypt");
      return;
    }
    setDecryptedMessage(decryptedMessages);
  };

  return (
    <div>
      <div>
        <div><label htmlFor="sbt-address">SBT address</label></div>
        <input
          id="sbt-address"
          value={sbtAddress}
          onChange={e => setSBTAddress(e.target.value)}
        />
      </div>
      <div>
        <div><label htmlFor="token-id">Disclosure tokenId</label></div>
        <input
          id="token-id"
          value={tokenId}
          onChange={e => setTokenId(+e.target.value)}
        />
      </div>
      <div>
        <p>
          <label htmlFor="content">Decrypted content</label><br />
          <span id="content">{decryptedMessage}</span>
        </p>
      </div>
      <button className="cbd-button" onClick={() => viewContent(sbtAddress, tokenId)}>
        View disclosed VC
      </button>
    </div>
  );
};

export default Viewer;
