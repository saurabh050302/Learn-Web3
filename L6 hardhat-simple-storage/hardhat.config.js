require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number"); //importing external tasks
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */

// const SEPOLIA_RPC_URL = toString(process.env.SEPOLIA_RPC_URL);
// const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",

  networks: {
    sepolia: {
      url:
        // SEPOLIA_RPC_URL ||
        `https://eth-sepolia.g.alchemy.com/v2/6tBHWXiUOsjk2FE1kFRyDG-Ym1GSuBoL`,

      accounts: [
        // SEPOLIA_PRIVATE_KEY ||
        `056f654b5725d799ab4298f83f2a874ce797cec9714312203eb94b01c5cc37e8`,
      ],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [Hardhat defaults to the 10 accounts],
      chainId: 31337,
    },
  },

  solidity: "0.8.18",

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
};
