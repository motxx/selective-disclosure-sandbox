import React, { VFC } from "react";
import WalletHeader from "../Common/WalletHeader";
import ShowVC from "./Holder/ShowVC";
import DiscloseVC from "./Holder/DiscloseVC";

const Holder: VFC = () => {
  return (
    <div>
      <WalletHeader
        pageTitle={"Holder"}
      />
      <div className="post-container">
        <ShowVC />
        <DiscloseVC />
      </div>
    </div>
  );
};

export default Holder;
