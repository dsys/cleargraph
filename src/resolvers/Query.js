const { web3, getBlock, getTransaction } = require('../web3');

const Query = {
  ethereumGasPrice(parent, { network = 'MAINNET' }) {
    return web3[network].eth.getGasPrice();
  },

  ethereumAddress(parent, { hash, network = 'MAINNET' }, ctx, info) {
    return { hash, network };
  },

  ethereumBlock(parent, args, ctx, info) {
    return getBlock(args);
  },

  ethereumTransaction(parent, args, ctx, info) {
    return getTransaction(args);
  }
};

module.exports = { Query };
