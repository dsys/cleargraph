import { Context } from "../context";
import { web3, Web3Address } from "../web3/client";
import { fetchTransactions } from "../web3/etherscan";

export const EthereumAddress = {
  display(parent: Web3Address) {
    return parent.display || parent.address;
  },
  hex(parent: Web3Address) {
    return parent.address;
  },
  balance(parent: Web3Address, args, ctx: Context) {
    return ctx.loaders.web3.balance.load(parent);
  },
  transactionCount(parent: Web3Address, args, ctx: Context) {
    return ctx.loaders.web3.transactionCount.load(parent);
  },
  async transactions(parent: Web3Address, args, ctx: Context) {
    const txs = await fetchTransactions({
      address: parent.address,
      network: parent.network,
      ...args
    });

    return ctx.loaders.web3.transaction.loadMany(
      txs.map(hash => ({
        hash,
        network: parent.network
      }))
    );
  },
  contract(parent: Web3Address, args, ctx: Context) {
    return ctx.loaders.web3.contract.load({
      address: parent.address,
      interface: args.interface,
      network: parent.network
    });
  },
  tokenContract(parent, args, ctx: Context) {
    const iface = args.interface || {};
    iface.standards = iface.standards || [];
    iface.standards.push("ERC_20");
    iface.standards.push("ERC_721");

    return ctx.loaders.web3.contract.load({
      address: parent.address,
      interface: iface,
      network: parent.network || "MAINNET"
    });
  },
  identityContract(parent, args, ctx: Context) {
    const iface = args.interface || {};
    iface.standards = iface.standards || [];
    iface.standards.push("ERC_725");

    return ctx.loaders.web3.contract.load({
      address: parent.address,
      interface: iface,
      network: parent.network || "MAINNET"
    });
  }
};
