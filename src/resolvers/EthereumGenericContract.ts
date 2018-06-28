import { Context } from "../context";

export const EthereumGenericContract = {
  address(parent, args, ctx: Context) {
    return ctx.loaders.web3.address.load({
      address: parent._address,
      network: parent.network
    });
  },
  method(parent, args: { signature: string }) {
    if (!(args.signature in parent.methods)) {
      return null;
    }

    return { contract: parent, methodSignature: args.signature };
  }
};
