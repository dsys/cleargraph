import { BigNumber } from "bignumber.js";
import { Context } from "../context";
import { callMethodSafe } from "../web3/contracts";

export const EthereumTokenContract = {
  address(parent) {
    return { hash: parent._address, network: parent.network };
  },
  method(parent, args: { signature: string }) {
    if (!(args.signature in parent.methods)) {
      return null;
    }

    return { contract: parent, methodSignature: args.signature };
  },
  name(parent) {
    return callMethodSafe(parent, "name");
  },
  symbol(parent) {
    return callMethodSafe(parent, "symbol");
  },
  decimals(parent) {
    return callMethodSafe(parent, "decimals");
  },
  totalSupply(parent) {
    return callMethodSafe(parent, "totalSupply");
  },
  async owner(parent, args: { tokenId: string }) {
    const ownerAddress = await callMethodSafe(parent, "ownerOf", [
      args.tokenId
    ]);

    if (!ownerAddress) {
      return null;
    }

    return { hash: ownerAddress, network: parent.network };
  },
  async balance(parent, args: { owner: string }) {
    const rawBalance = await callMethodSafe(parent, "balanceOf", [args.owner]);
    const decimals = await callMethodSafe(parent, "decimals");

    if (!decimals) {
      return rawBalance;
    }

    return new BigNumber(rawBalance).dividedBy(
      new BigNumber(10).exponentiatedBy(decimals)
    );
  },
  rawBalance(parent, args: { owner: string }) {
    return callMethodSafe(parent, "balanceOf", [args.owner]);
  },
  allowance(parent, args: { owner: string; spender: string }) {
    return callMethodSafe(parent, "allowance", [args.owner, args.spender]);
  }
};
