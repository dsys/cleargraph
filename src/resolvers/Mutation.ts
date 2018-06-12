import { Context } from "../context";
import {
  checkPhoneNumberVerificationCode,
  generatePhoneNumberHash,
  startPhoneNumberVerification,
} from "../phone";
import { web3 } from "../web3/client";

export const Mutation = {
  async startPhoneNumberVerification(
    parent,
    args: { phoneNumber: string },
    ctx: Context,
  ) {
    await startPhoneNumberVerification(args.phoneNumber);
    return { ok: true };
  },
  async updatePhoneNumber(
    parent,
    args: {
      phoneNumber: string;
      verificationCode: string;
      address: string;
    },
    ctx: Context,
    info,
  ) {
    // await checkPhoneNumberVerificationCode(args.phoneNumber, args.verificationCode);

    const hashedPhoneNumber = generatePhoneNumberHash(args.phoneNumber);
    return ctx.db.mutation.upsertPhoneNumber(
      {
        create: { hashedPhoneNumber, address: args.address },
        update: { address: args.address },
        where: { hashedPhoneNumber },
      },
      info,
    );
  },
  async deletePhoneNumber(
    parent,
    args: {
      phoneNumber: string;
      verificationCode: string;
    },
    ctx: Context,
  ) {
    await checkPhoneNumberVerificationCode(
      args.phoneNumber,
      args.verificationCode,
    );

    const hashedPhoneNumber = generatePhoneNumberHash(args.phoneNumber);
    await ctx.db.mutation.deletePhoneNumber({
      where: { hashedPhoneNumber },
    });

    return { ok: true };
  },
  async sendRawTransaction(parent, args, ctx) {
    const hash = await web3[args.network].eth.sendRawTransaction(args);
    return { hash, network: args.network };
  },
};
