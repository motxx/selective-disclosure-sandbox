import { client, authSig, getLitActionCode, errorLog } from "../utils.mjs";

import presentation from "./data/proof.json" assert { type: "json" };

// ------------ Setup ------------
const litActionCode = await getLitActionCode();

// ------------ Execute & Verify ------------

// it("should verify a ZK proof", async () =>
{
  const r = await client.executeJs({
    code: litActionCode,
    authSig,
    jsParams: {
      presentation: JSON.stringify(presentation),
    },
  });

  const { data, verified } = r.response;
  if (!verified) {
    errorLog("Failed to verify. r:", r);
    exit();
  }
  console.log("data:", JSON.parse(data));
  console.log("verified:", verified);
}
// );
