const { web3 } = require('../web3');

const Query = {
  ethereumGasPrice(parent, { network = 'MAINNET' }) {
    return web3[network].eth.getGasPrice();
  },

  ethereumBlockNumber(parent, { network = 'MAINNET' }) {
    return web3[network].eth.getBlockNumber();
  },

  ethereumAddress(parent, { hash, network = 'MAINNET' }) {
    return { hash, network };
  },

  ethereumBlock(parent, args, ctx, info) {
    return ctx.loaders.web3.block.load(args);
  },

  ethereumTransaction(parent, args, ctx, info) {
    return ctx.loaders.web3.transaction.load(args);
  }
};

module.exports = { Query };
