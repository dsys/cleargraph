const { getBlock, getTransaction } = require('../web3');

const EthereumBlock = {
  parent: (parent, args, ctx, info) => {
    return getBlock({ hash: parent.parentHash, network: parent.network });
  },
  transactions: (parent, args, ctx, info) => {
    return parent.transactions.map(hash =>
      getTransaction({ network: args.network, hash })
    );
  }
};

module.exports = { EthereumBlock };
