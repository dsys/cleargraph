import { BigNumber } from "bignumber.js";
import { Context } from "../context";
import { web3 } from "../web3/client";

export const Query = {
  phoneNumber(parent, { hashedPhoneNumber }, ctx: Context, info) {
    return ctx.db.query.phoneNumber({
      where: { hashedPhoneNumber: hashedPhoneNumber.toLowerCase() }
    });
  },

  ethereumValue(parent, args: { value: string; unit: string }) {
    return web3.MAINNET.utils.toWei(args.value.toString(), args.unit || "wei");
  },

  ethereumGasPrice(parent, { network = "MAINNET" }) {
    return web3[network].eth.getGasPrice();
  },

  ethereumBlockNumber(parent, { network = "MAINNET" }) {
    return web3[network].eth.getBlockNumber();
  },

  ethereumAddress(parent, { address, network = "MAINNET" }, ctx: Context) {
    return ctx.loaders.web3.address.load({ address, network });
  },

  // tslint:disable-next-line:variable-name
  ethereumBlock(parent, { hash, number, network = "MAINNET" }, ctx: Context) {
    return ctx.loaders.web3.block.load({ hash, number, network });
  },

  ethereumTransaction(parent, { hash, network = "MAINNET" }, ctx: Context) {
    return ctx.loaders.web3.transaction.load({ hash, network });
  },

  ethereumContract(parent, args, ctx: Context) {
    return ctx.loaders.web3.contract.load({
      address: args.address,
      interface: args.interface,
      network: args.network || "MAINNET"
    });
  },

  ethereumTokenContract(parent, args, ctx: Context) {
    const iface = args.interface || {};
    iface.standards = iface.standards || [];
    iface.standards.push("ERC_20");
    iface.standards.push("ERC_721");

    return ctx.loaders.web3.contract.load({
      address: args.address,
      interface: iface,
      network: args.network || "MAINNET"
    });
  },

  ethereumIdentityContract(parent, args, ctx: Context) {
    const iface = args.interface || {};
    iface.standards = iface.standards || [];
    iface.standards.push("ERC_725");

    return ctx.loaders.web3.contract.load({
      address: args.address,
      interface: iface,
      network: args.network || "MAINNET"
    });
  }
};
