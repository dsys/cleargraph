import { Context } from "../context";
import { checkPhoneNumberVerificationCode, startPhoneNumberVerification } from "../phone";
import { web3 } from "../web3/client";

export const Mutation = {
  async startPhoneNumberVerification(parent, args: { phoneNumber: string }, ctx: Context) {
    await startPhoneNumberVerification(args.phoneNumber);
    return { ok: true };
  },
  async updatePhoneNumber(
    parent,
    args: {
      phoneNumber: string,
      verificationCode: string,
      address: string,
    },
    ctx: Context,
  ) {
    await checkPhoneNumberVerificationCode(args.phoneNumber, args.verificationCode);
    // console.log(`setting phone number to ${args.address}`);
    return { ok: true };
  },
  async sendRawTransaction(parent, args, ctx) {
    const hash = await web3[args.network].eth.sendRawTransaction(args);
    return { hash, network: args.network };
  },
};
