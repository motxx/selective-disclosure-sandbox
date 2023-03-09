import React, { VFC } from "react";
import WalletHeader from "../../common/WalletHeader";
import Viewer from "./Verifier/Viewer";

const Verifier: VFC = () => {
  return (
    <div>
      <WalletHeader
        pageTitle={"Verifier"}
      />
      <div className="post-container">
        <Viewer />
      </div>
    </div>
  );
};

export default Verifier;
