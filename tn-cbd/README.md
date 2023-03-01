# Alpha leaks demo

See the live demo [here](https://nucypher.github.io/alpha-leaks-demo/).

This is a demo that illustrates a use case of [Nucypher's Conditions-Based
Decryption](https://docs.threshold.network/app-development/threshold-access-control-tac/get-started-with-tac).

This is a weblog. There are three levels of subscription. Each subscription level will let you
access the posts corresponding to your subscription. Subscription levels are defined by the balance
of MultiFaucet NFTs your account owns.

![](https://placehold.co/15x1/peru/peru.png) Bronze subscription will let you read only the Bronze
posts. **One NFT is needed.**

![](https://placehold.co/15x15/silver/silver.png) Silver subscription will let you read Bronze and
Silver posts. **Two NFTs are needed.**

![](https://placehold.co/15x15/gold/gold.png) Gold subscription will let you read Bronze, Silver,
and Gold posts. **Three NFTs are needed.**

The decryption of the posts is done by Nucypher's CBD technology. CBD will check the balance of NFTs
and show you the corresponding blog posts.

## Usage

To run this demo you will need to have MetaMask installed and an account with sufficient MATIC on
Polygon Mumbai testnet to fund the "Create Policy" contract method call.

Additionally, to have decryption rights over the posts, you will need a number of [MultiFaucet
NFTs](https://mumbai.polygonscan.com/address/0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b#code) on
Polygon Mumbai testnet. The balance of this ERC721 token will determine the subscription level and,
therefore, the number of posts you will be able to see.

Both, MATIC and MultiFaucet NFTs can be claimed in [Paradigm
MultiFaucet](https://faucet.paradigm.xyz/).


## Installation

Requires node version 16 or later.

```bash
$ yarn install

$ yarn build

$ yarn start
```

## References

The example project
[react-webpack-5-experiments](https://github.com/nucypher/nucypher-ts/tree/main/examples/react-webpack-5-experiments)
has been used as base for this demo.
