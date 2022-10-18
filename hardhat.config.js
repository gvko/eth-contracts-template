/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { ETHEREUM_NODE_API_URL, POLYGON_NODE_API_URL, WALLET_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'goerli',
  networks: {
    hardhat: {},
    goerli: {
      url: ETHEREUM_NODE_API_URL,
      accounts: [`0x${WALLET_PRIVATE_KEY}`]
    },
    mumbai: {
      url: POLYGON_NODE_API_URL,
      accounts: [`0x${WALLET_PRIVATE_KEY}`]
    }
  },
};
