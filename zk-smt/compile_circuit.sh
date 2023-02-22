#!/bin/bash

# Compile circuit
circom circuit.circom --r1cs --wasm --sym

# View circuit info
snarkjs r1cs info circuit.r1cs
snarkjs r1cs print circuit.r1cs circuit.sym
