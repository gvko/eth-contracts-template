# eth-contracts-template

This repository is a template project for developing and deploying Smart contracts for EVM-based chains.
It already contains a template contract for NFT collections + couple of TS scripts for minting NFTs off the deployed
contact(s).

## Getting started

### Set up env vars

Create a `.env` file in the root of the repo, copy the contents of `.env.example` and replace the values surrounded
by `< >` with actual values (eg. the `<KEY>` values).

### Compile the Solidity contracts locally

```
npx hardhat compile
```

### Deploy the contract to a given network

```shell
npm run deploy-eth

// or

npm run deploy-polygon

// or more manual/custom way:

npx hardhat --network <NETWORK> run scripts/deploy.js
```

Networks can be f.e.:

* `mumbai` (test Polygon)
* `goerli` (test Ethereum)
* `mainnet` (mainnet Ethereum)
* `polygon` (mainnet Polygon)

**NOTE:** if you want to add a new network, you must first add config in `hardhat.config.js`, before you deploy a
contract to that network.
And also the `.env` config for the node we're gonna use to connect to the network. For example, if we use Alchemy as
provider, we are gonna need the `API_URL` for the given network.

Currently there's no configs for the mainnet Ethereum and Polygon networks.

### Mint an NFT

The repo contains a template contract for minting NFT, based on the ERC721 standard. Therefore, there is also included
a `ts` script that mints an NFT based on that contract.

**NOTE:** Before minting:

* get the newly deployed contract's address and put it in `.env` as `CONTRACT_ADDRESS_<network>`
* upload your NFT media asset to IPFS
* get that URL and add it to the `mint-nft.ts` script (in the last line)

```
ts-node scripts/mint-nft-<NETWORK>.js
```

For each network we want to deploy to, there should be a separate script. Or you can implement one script that accepts
params to choose the network, if you have the time. 🤷
