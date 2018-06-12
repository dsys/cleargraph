import { Context } from "../context";
import { Web3Block } from "../web3/client";

export const EthereumBlock = {
  parent(parent: Web3Block, args, ctx: Context) {
    return ctx.loaders.web3.block.load({
      hash: parent.parentHash,
      network: parent.network,
    });
  },
  miner(parent: Web3Block, args, ctx: Context) {
    return ctx.loaders.web3.address.load({
      hash: parent.miner,
      network: parent.network,
    });
  },
  transactions(parent: Web3Block, args, ctx: Context) {
    return ctx.loaders.web3.transaction.loadMany(
      parent.transactions.map(hash => ({ hash, network: parent.network })),
    );
  },
  transactionCount(parent: Web3Block, args, ctx: Context) {
    return ctx.loaders.web3.blockTransactionCount.load({
      hash: parent.parentHash,
      network: parent.network,
    });
  },
  uncles(parent: Web3Block, args, ctx: Context) {
    return ctx.loaders.web3.block.loadMany(
      parent.uncles.map(hash => ({
        hash,
        network: parent.network,
      })),
    );
  },
};
