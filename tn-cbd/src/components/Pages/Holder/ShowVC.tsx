import React, { useState } from "react";
import { VCDecrypter } from "../../../common/VCDecrypter";

function ShowVC({ setDisclosureMessage }: { setDisclosureMessage: any }) {
  const [sbtAddress, setSBTAddress] = useState("0x36DC0ae7272556B998a30A8996C62bb966B178c5");
  const [tokenId, setTokenId] = useState(0);
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const showVC = async (contractAddress: string, tokenId: number) => {
    setDecryptedMessage("");
    const decrypted = await new VCDecrypter(contractAddress).decryptVC(tokenId);
    if (!decrypted) {
      console.log("failed to vcdecrypt");
      return;
    }
    setDecryptedMessage(decrypted);
    setDisclosureMessage(decrypted);
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
        <label>Token Id</label><br />
        <input id="token-id" value={tokenId} onChange={e => setTokenId(+e.target.value)} />
      </div>
      <button className="cbd-button" onClick={() => showVC(sbtAddress, tokenId)}>
        Show VC
      </button>
      <div>
        <p>
          <label htmlFor="message">Decrypted message</label><br />
          <span id="message">{decryptedMessage}</span>
        </p>
      </div>
    </div>
  );
}

export default ShowVC;
