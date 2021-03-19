const path = require("path");

require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    rinkeby:{
      provider: () => new HDWalletProvider(
        mnemonic,
        `https://rinkeby.infura.io/v3/6dcc6debe9374cec8c3b448abf0ac9ce`
      ),
        network_id: 4,          // Rinkeby's network id
        gas: 5500000,   
    },
  },
  compilers: {
    solc: {
      version: "^0.6.0",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
