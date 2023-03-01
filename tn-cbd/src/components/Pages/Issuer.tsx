import React, { VFC } from "react";
import WalletHeader from "../Common/WalletHeader";
import IssueVC from "./Issuer/IssueVC";

const Issuer: VFC = () => {
  return (
    <div>
      <WalletHeader
        pageTitle={"Issuer"}
      />
      <div className="post-container">
        <IssueVC />
      </div>
    </div>
  );
};

export default Issuer;
