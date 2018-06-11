import { Context } from "../context";
import { Web3Transaction } from "../web3/client";

export const EthereumTransaction = {
  block: (parent: Web3Transaction, args, ctx: Context, info) => {
    return ctx.loaders.web3.block.load({
      hash: parent.blockHash,
      network: parent.network,
    });
  },
  from: (parent: Web3Transaction, args, ctx: Context, info) => {
    return ctx.loaders.web3.address.load({
      hash: parent.from,
      network: parent.network,
    });
  },
  to: (parent: Web3Transaction, args, ctx: Context, info) => {
    return ctx.loaders.web3.address.load({
      hash: parent.to,
      network: parent.network,
    });
  },
};
