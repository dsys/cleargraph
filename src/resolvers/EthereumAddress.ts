import { Context } from "../context";
import { web3, Web3Address } from "../web3/client";
import { fetchTransactions } from "../web3/etherscan";

export const EthereumAddress = {
  balance(parent: Web3Address, args, ctx: Context) {
    return ctx.loaders.web3.balance.load(parent);
  },
  transactionCount(parent: Web3Address, args, ctx: Context) {
    return ctx.loaders.web3.transactionCount.load(parent);
  },
  async transactions(parent: Web3Address, args, ctx: Context) {
    const txs = await fetchTransactions({
      hash: parent.hash,
      network: parent.network,
      ...args
    });

    return ctx.loaders.web3.transaction.loadMany(
      txs.map(hash => ({
        hash,
        network: parent.network
      }))
    );
  }
};
