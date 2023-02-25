#!/bin/bash

# Compile circuit
circom circuit.circom --r1cs --wasm --sym && exit 1

# View circuit info
snarkjs r1cs info circuit.r1cs && exit 1
snarkjs r1cs print circuit.r1cs circuit.sym && exit 1
