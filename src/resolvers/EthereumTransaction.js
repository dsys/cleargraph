const { getBlock } = require('../web3');

const EthereumTransaction = {
  from: (parent, args, ctx, info) => {
    return { network: parent.network, hash: parent.from };
  },
  to: (parent, args, ctx, info) => {
    return { network: parent.network, hash: parent.to };
  },
  block: (parent, args, ctx, info) => {
    return getBlock({ network: parent.network, hash: parent.blockHash });
  }
};

module.exports = { EthereumTransaction };
