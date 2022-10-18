require('dotenv').config()
import contractABI
  from '../artifacts/contracts/NftCollectionTemplate.sol/NftCollectionTemplate.json'
import { Contract, providers, Wallet } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'

const {
  CONTRACT_ADDRESS_POLYGON,
  WALLET_PUBLIC_KEY,
  WALLET_PRIVATE_KEY,
  POLYGON_NODE_API_URL,
  MINT_PRICE_COEFFICIENT,
  MINT_LIMIT_COEFFICIENT,
} = process.env
const provider = new providers.JsonRpcProvider(POLYGON_NODE_API_URL)
const wallet = new Wallet(WALLET_PRIVATE_KEY, provider)
const contract = new Contract(CONTRACT_ADDRESS_POLYGON, contractABI.abi, wallet)

async function mintNft(tokenMetadataUrl, toAddress = WALLET_PUBLIC_KEY) {
  const gasPrice = await provider.getGasPrice()
  const gasEstimate = await contract.estimateGas.mintNFT(toAddress, tokenMetadataUrl)

  try {
    const tx: TransactionResponse = await contract.functions.mintNFT(toAddress, tokenMetadataUrl, {
      gasPrice: gasPrice.toNumber() * Number(MINT_PRICE_COEFFICIENT),
      gasLimit: gasEstimate.toNumber() * Number(MINT_LIMIT_COEFFICIENT),
    })
    await tx.wait(1)

    console.log({ msg: 'Transaction confirmed', tx })
    console.log(`SEE THE TX AT: https://mumbai.polygonscan.com/tx/${tx.hash}`)
  } catch (err) {
    console.error('Could not send tx', err)
  }
}

// URL to you media asset in IPFS
const nftMediaAssetUrl = 'https://...'
// wallet address you want to mint the NFT to
const addressToMintTo = undefined

mintNft(nftMediaAssetUrl, addressToMintTo)
