import { Context } from "../context";
import { Web3Transaction } from "../web3/client";

export const EthereumTransaction = {
  block(parent: Web3Transaction, args, ctx: Context, info) {
    return ctx.loaders.web3.block.load({
      hash: parent.blockHash,
      network: parent.network
    });
  },
  from(parent: Web3Transaction, args, ctx: Context, info) {
    if (!parent.from) {
      return null;
    }

    return ctx.loaders.web3.address.load({
      address: parent.from,
      network: parent.network
    });
  },
  to(parent: Web3Transaction, args, ctx: Context, info) {
    if (!parent.to) {
      return null;
    }

    return ctx.loaders.web3.address.load({
      address: parent.to,
      network: parent.network
    });
  },
  async gasUsed(parent: Web3Transaction, args, ctx: Context, info) {
    const receipt = await ctx.loaders.web3.transactionReceipt.load({
      hash: parent.hash,
      network: parent.network
    });

    return receipt ? receipt.gasUsed : null;
  },
  async cumulativeGasUsed(parent: Web3Transaction, args, ctx: Context, info) {
    const receipt = await ctx.loaders.web3.transactionReceipt.load({
      hash: parent.hash,
      network: parent.network
    });

    return receipt ? receipt.cumulativeGasUsed : null;
  },
  async contractAddress(parent: Web3Transaction, args, ctx: Context, info) {
    const receipt = await ctx.loaders.web3.transactionReceipt.load({
      hash: parent.hash,
      network: parent.network
    });

    return receipt && receipt.contractAddress
      ? ctx.loaders.web3.address.load({
          address: receipt.contractAddress,
          network: parent.network
        })
      : null;
  },
  async status(parent: Web3Transaction, args, ctx: Context, info) {
    const receipt = await ctx.loaders.web3.transactionReceipt.load({
      hash: parent.hash,
      network: parent.network
    });

    return receipt ? receipt.status : null;
  },
  async logs(parent: Web3Transaction, args, ctx: Context) {
    const receipt = await ctx.loaders.web3.transactionReceipt.load({
      hash: parent.hash,
      network: parent.network
    });

    return receipt ? receipt.logs : [];
  }
};
