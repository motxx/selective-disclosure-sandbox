import React, { VFC, useState } from "react";
import WalletHeader from "../../common/WalletHeader";
import ShowVC from "./Holder/ShowVC";
import DiscloseVC from "./Holder/DiscloseVC";
import type { DeployedStrategy } from "@nucypher/nucypher-ts";
// import StrategyBuilder from "./Issuer/StrategyBuilder";

const Holder: VFC = () => {
  const [depStrategy, setDepStrategy] = useState(null as DeployedStrategy | null);
//  const [depStrategyStatus, setDepStrategyStatus] = useState("not deployed");
  const [disclosureMessage, setDisclosureMessage] = useState("");

  return (
    <div>
      <WalletHeader
        pageTitle={"Holder"}
      />
      <div className="post-container">
        <h2>Show VC</h2>
        <ShowVC
          setDisclosureMessage={setDisclosureMessage}
        />
        <h2>Disclose VC</h2>
        <DiscloseVC
          depStrategy={depStrategy}
          disclosureMessage={disclosureMessage}
        />
      </div>
    </div>
  );
  /*
        <StrategyBuilder
          setDepStrategy={setDepStrategy}
          setDepStrategyStatus={setDepStrategyStatus}
        />
        <p>Strategy: {depStrategyStatus}</p>
  */
};

export default Holder;
