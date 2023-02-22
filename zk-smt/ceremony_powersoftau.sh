#!/bin/sh

# Secure Multi-party Computation
snarkjs powersoftau new bn128 16 pot16_0000.ptau -v
snarkjs powersoftau contribute pot16_0000.ptau pot16_0001.ptau --name="First contribution" -v
snarkjs powersoftau contribute pot16_0001.ptau pot16_0002.ptau --name="Second contribution" -v -e="some random text"

snarkjs powersoftau export challenge pot16_0002.ptau challenge_0003
snarkjs powersoftau challenge contribute bn128 challenge_0003 response_0003 -e="another random text"
snarkjs powersoftau import response pot16_0002.ptau response_0003 pot16_0003.ptau -n="Third contribution name"

# Apply a random beacon，get final ptau file
snarkjs powersoftau beacon pot16_0003.ptau pot16_beacon.ptau 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon"
snarkjs powersoftau prepare phase2 pot16_beacon.ptau pot16_final.ptau -v
