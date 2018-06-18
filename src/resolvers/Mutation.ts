import { Context } from "../context";
import {
  checkPhoneNumberVerificationCode,
  generatePhoneNumberHash,
  startPhoneNumberVerification
} from "../phone";
import { web3 } from "../web3/client";

export const Mutation = {
  async startPhoneNumberVerification(
    parent,
    { input }: { input: { phoneNumber: string } },
    ctx: Context
  ) {
    await startPhoneNumberVerification(input.phoneNumber);
    return { ok: true };
  },
  async updatePhoneNumber(
    parent,
    {
      input
    }: {
      input: {
        phoneNumber: string;
        verificationCode: string;
        address: string;
      };
    },
    ctx: Context,
    info
  ) {
    await checkPhoneNumberVerificationCode(
      input.phoneNumber,
      input.verificationCode
    );

    const hashedPhoneNumber = generatePhoneNumberHash(input.phoneNumber);
    return {
      phoneNumber: ctx.db.mutation.upsertPhoneNumber(
        {
          create: { hashedPhoneNumber, address: input.address },
          update: { address: input.address },
          where: { hashedPhoneNumber }
        },
        // TODO: what do I do with this?
        info
      )
    };
  },
  async deletePhoneNumber(
    parent,
    {
      input
    }: {
      input: {
        phoneNumber: string;
        verificationCode: string;
      };
    },
    ctx: Context
  ) {
    await checkPhoneNumberVerificationCode(
      input.phoneNumber,
      input.verificationCode
    );

    const hashedPhoneNumber = generatePhoneNumberHash(input.phoneNumber);
    await ctx.db.mutation.deletePhoneNumber({
      where: { hashedPhoneNumber }
    });

    return { ok: true };
  },
  async sendRawEthereumTransaction(parent, { input }, ctx) {
    const hash = await web3[input.network].eth.sendRawTransaction(input);
    return {
      transaction: ctx.loaders.web3.transaction.load({
        hash,
        network: input.network
      })
    };
  }
};
