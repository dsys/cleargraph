const { getBlock, getTransaction } = require('../web3');

const EthereumBlock = {
  parent: (parent, args, ctx, info) => {
    return ctx.loaders.web3.block.load({ hash: parent.parentHash, network: parent.network })
  },
  miner: (parent, args, ctx, info) => {
    return { hash: parent.miner, network: parent.network }
  },
  transactions: (parent, args, ctx, info) => {
    return ctx.loaders.web3.transaction.loadMany(
      parent.transactions.map(hash => ({ hash, network: args.network }))
    )
  },
  transactionCount: (parent, args, ctx) => {
    return ctx.loaders.web3.blockTransactionCount.load({ hash: parent.parentHash, network: parent.network })
  },
  uncles: (parent, args, ctx) => {
    return ctx.loaders.web3.block.loadMany(
      parent.uncles.map(hash => ({ hash, network: parent.network }))
    )
  }
};

module.exports = { EthereumBlock };
