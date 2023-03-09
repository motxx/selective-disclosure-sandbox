import React, { VFC, useState } from "react";
import WalletHeader from "../../common/WalletHeader";
import IssueVC from "./Issuer/IssueVC";
import StrategyBuilder from "./Issuer/StrategyBuilder";
import type { DeployedStrategy } from "@nucypher/nucypher-ts";

const Issuer: VFC = () => {
  const [depStrategy, setDepStrategy] = useState(null as DeployedStrategy | null);
  const [depStrategyStatus, setDepStrategyStatus] = useState("not deployed");

  return (
    <div>
      <WalletHeader
        pageTitle={"Issuer"}
      />
      <div className="post-container">
        <StrategyBuilder
          setDepStrategy={setDepStrategy}
          setDepStrategyStatus={setDepStrategyStatus}
        />
        <p>Strategy: {depStrategyStatus}</p>
        <IssueVC
          depStrategy={depStrategy}
        />
      </div>
    </div>
  );
};

export default Issuer;
