# ZK-SMT (ZK Sparse Merkle Tree)

```circom
component main = SMTVerifier(N);
```

## Getting started

### 1. Install deps

* global deps
```
yarn global add circom
yarn global add snarkjs
```

* local deps
```
yarn
```

### 2. MPC ceremony

1. Modify `ceremony_powersoftau.sh` _power_ (default 16).
2. Run shell script.

```
./ceremony_powersoftau.sh
```

### 3. Compile circuit

```
./compile_circuit.sh
```

#### 4. Generate input

1. Modify `generate_input.js` `nLevels` and `main()` function.
2. Run shell script and create `input.json`.

```
./generate_input.js > input.json
```

#### 5. Trusted setup

1. Create witness
```
cd circuit_js
node generate_witness.js circuit.wasm ../input.json ../witness.wtns
cd ..
```

2. Setup plonk
```
# power = 16
snarkjs plonk setup circuit.r1cs pot16_final.ptau circuit_final.zkey
```

3. Get pk and export the vk
```
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json
```

#### 6. Create proof

**TODO: create `public.json` generator.**

```
snarkjs plonk prove circuit_final.zkey witness.wtns proof.json public.json
```

#### 7. Verify proof

```
snarkjs plonk verify verification_key.json public.json proof.json
```

Expected result:
```
[INFO]  snarkJS: OK!
```

# Refs

* https://github.com/LuozhuZhang/zkps-circuit-snark
* https://docs.iden3.io/protocol/circuits/
* https://scrapbox.io/bitpickers/snarkjs+powers_of_tau_ceremony%E3%81%A7zk_proof%E3%82%92%E4%BD%9C%E3%82%8B
