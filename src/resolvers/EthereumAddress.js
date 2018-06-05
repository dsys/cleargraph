const { web3 } = require('../web3');

const EthereumAddress = {
  balance: ({ hash, network = 'MAINNET' }, args, ctx) => {
    return ctx.loaders.web3.balance.load({ hash, network })
  },
  transactionCount: ({ hash, network = 'MAINNET' }, args, ctx) => {
    return ctx.loaders.web3.transactionCount.load({ hash, network })
  }
};

module.exports = { EthereumAddress };
