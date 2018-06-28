import { BigNumber } from "bignumber.js";
import { Context } from "../context";
import { callMethodSafe } from "../web3/contracts";

export const EthereumIdentityContract = {
  address(parent, args, ctx: Context) {
    return ctx.loaders.web3.address.load({
      hash: parent._address,
      network: parent.network
    });
  },
  method(parent, args: { signature: string }) {
    if (!(args.signature in parent.methods)) {
      return null;
    }

    return { contract: parent, methodSignature: args.signature };
  },
  async key(parent, args: { key: string }) {
    const result = await callMethodSafe(parent, "getKey", [args.key]);
    if (!result) {
      return null;
    }

    return { key: result[2], keyType: result[1], purposes: result[0] };
  },
  async keyByPurpose(parent, args: { purpose: string }) {
    const keys = await callMethodSafe(parent, "keysByPurpose", [args.purpose]);

    if (!keys) {
      return null;
    }

    return Promise.all(
      keys[0].map(async k => {
        const result = await callMethodSafe(parent, "getKey", [k]);
        return { key: result[2], keyType: result[1], purposes: result[0] };
      })
    );
  }
};
