pragma circom 2.0.0;

include "./circuits/smt/smtverifier.circom";

template ClaimSMT(nLevels) {
    signal input enabled;
    signal input root;
    signal input siblings[nLevels];
    signal input oldKey;
    signal input oldValue;
    signal input isOld0;
    signal input key;
    signal input keyNonce;
    signal input value;
    signal input fnc;

    var i;

    component smt = SMTVerifier(nLevels);
    smt.enabled <== enabled;
    smt.root <== root;
    for (i=0; i<nLevels; i++) smt.siblings[i] <== siblings[i];
    smt.oldKey <== oldKey;
    smt.oldValue <== oldValue;
    smt.isOld0 <== isOld0;
    smt.key <== key + keyNonce;
    smt.value <== value;
    smt.fnc <== fnc;
}

component main {public [
    enabled, root, siblings, oldKey, oldValue, isOld0, key, value, fnc
]} = ClaimSMT(10);
