import { Context } from "../context";

export const PhoneNumber = {
  ethereumAddress(parent, { network = "MAINNET" }, ctx: Context) {
    return ctx.loaders.web3.address.load({ hash: parent.address, network });
  }
};
