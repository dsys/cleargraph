import { Context } from "../context";
import { web3 } from "../web3";

export const Query = {
  ethereumGasPrice(parent, { network = "MAINNET" }) {
    return web3[network].eth.getGasPrice();
  },

  ethereumBlockNumber(parent, { network = "MAINNET" }) {
    return web3[network].eth.getBlockNumber();
  },

  ethereumAddress(parent, { hash, network = "MAINNET" }) {
    return { hash, network };
  },

  ethereumBlock(parent, args, ctx: Context) {
    return ctx.loaders.web3.block.load(args);
  },

  ethereumTransaction(parent, args, ctx: Context) {
    return ctx.loaders.web3.transaction.load(args);
  },
};
