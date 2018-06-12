import { Context } from "../context";
import { web3 } from "../web3/client";

export const Query = {
  phoneNumber(parent, { hashedPhoneNumber }, ctx: Context, info) {
    return ctx.db.query.phoneNumber({
      where: { hashedPhoneNumber: hashedPhoneNumber.toLowerCase() },
    });
  },

  ethereumGasPrice(parent, { network = "MAINNET" }) {
    return web3[network].eth.getGasPrice();
  },

  ethereumBlockNumber(parent, { network = "MAINNET" }) {
    return web3[network].eth.getBlockNumber();
  },

  ethereumAddress(parent, { hash, network = "MAINNET" }, ctx: Context) {
    return ctx.loaders.web3.address.load({ hash, network });
  },

  ethereumBlock(parent, { hash, network = "MAINNET" }, ctx: Context) {
    return ctx.loaders.web3.block.load({ hash, network });
  },

  ethereumTransaction(parent, { hash, network = "MAINNET" }, ctx: Context) {
    return ctx.loaders.web3.transaction.load({ hash, network });
  },
};
