import { web3 } from "../web3";

export const Mutation = {
  async sendRawTransaction(parent, args, ctx) {
    const hash = await web3[args.network].eth.sendRawTransaction(args);
    return { hash, network: args.network };
  },
};
