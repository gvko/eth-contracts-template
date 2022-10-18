require('dotenv').config()
const ethers = require('hardhat').ethers

async function main() {
  const contractName = 'NftCollectionTemplate'
  const NftCollectionTemplate = await ethers.getContractFactory('NftCollectionTemplate')

  const nftCollection = await NftCollectionTemplate.deploy('CollectionName', 'CollectionSymbol', process.env.WALLET_PUBLIC_KEY)
  await nftCollection.deployed()
  console.log(`Contract '${contractName}' deployed to address:`, nftCollection.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
