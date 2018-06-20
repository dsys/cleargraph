import { Context } from "../context";

export const EthereumContract = {
  address(parent) {
    return { hash: parent._address, network: parent.network };
  },
  method(parent, args: { signature: string }) {
    if (!(args.signature in parent.methods)) {
      return null;
    }

    return { contract: parent, methodSignature: args.signature };
  }
};
