import { Context } from "../context";
import { web3, Web3Address } from "../web3/client";

export const EthereumAddress = {
  balance: (parent: Web3Address, args, ctx: Context) => {
    return ctx.loaders.web3.balance.load(parent);
  },
  transactionCount: (parent: Web3Address, args, ctx: Context) => {
    return ctx.loaders.web3.transactionCount.load(parent);
  },
};
