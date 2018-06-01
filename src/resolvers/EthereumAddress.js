const { web3 } = require('../web3');

const EthereumAddress = {
  balance: ({ network = 'MAINNET', hash }, args, ctx, info) => {
    return web3[network].eth.getBalance(hash);
  },
  transactionCount: async ({ network = 'MAINNET', hash }, args, ctx, info) => {
    return web3[network].eth.getTransactionCount(hash);
  }
};

module.exports = { EthereumAddress };
