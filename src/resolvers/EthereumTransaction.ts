import { Context } from "../context";
import { Web3Transaction } from "../web3";

export const EthereumTransaction = {
  block: (parent: Web3Transaction, args, ctx: Context, info) => {
    return ctx.loaders.web3.block.load({
      hash: parent.blockHash,
      network: parent.network,
    });
  },
  from: (parent: Web3Transaction, args, ctx: Context, info) => {
    return { network: parent.network, hash: parent.from };
  },
  to: (parent: Web3Transaction, args, ctx: Context, info) => {
    return { network: parent.network, hash: parent.to };
  },
};
