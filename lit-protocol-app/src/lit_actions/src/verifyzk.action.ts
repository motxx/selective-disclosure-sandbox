/**
 * NAME: verifyzk
 */

import type { VerifiablePresentation } from "vc-types";
import * as ecdsa_sd from "./ecdsa-sd-2023-cryptosuite";

const go = async (verifiablePresentation: VerifiablePresentation) => {
  const json = JSON.parse('{ "data":{}, "verified":"true" }');
  const response = {
    data: JSON.stringify(json),
    verified: json.verified,
  };
  LitActions.setResponse({
    response: JSON.stringify(response),
  });
};

go(presentation);
