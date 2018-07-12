import { Context } from "../context";
import {
  checkPhoneNumberVerificationCode,
  generatePhoneNumberHash,
  generatePhoneNumberToken,
  startPhoneNumberVerification,
  validatePhoneNumberToken
} from "../phone";
import { web3 } from "../web3/client";

export const Mutation = {
  async startPhoneNumberVerification(
    parent,
    { input }: { input: { phoneNumber: string } },
    ctx: Context
  ) {
    try {
      await startPhoneNumberVerification(input.phoneNumber);
      return { ok: true };
    } catch (err) {
      return {
        message: err.message,
        ok: false
      };
    }
  },
  async checkPhoneNumberVerification(
    parent,
    {
      input
    }: {
      input: {
        phoneNumber: string;
        verificationCode: string;
      };
    },
    ctx: Context,
    info
  ) {
    try {
      await checkPhoneNumberVerificationCode(
        input.phoneNumber,
        input.verificationCode
      );

      const {
        hashedPhoneNumber,
        phoneNumberToken,
        phoneNumberTokenExpires
      } = await generatePhoneNumberToken(input.phoneNumber);

      return {
        ok: true,
        phoneNumber: ctx.db.query.phoneNumber(
          {
            where: { hashedPhoneNumber }
          },
          // a bit of a hack since I'm not sure what to do with info here
          `{
          hashedPhoneNumber
          address
          createdAt
          updatedAt
        }`
        ),
        phoneNumberToken,
        phoneNumberTokenExpires
      };
    } catch (err) {
      return {
        message: err.message,
        ok: false
      };
    }
  },
  async updatePhoneNumber(
    parent,
    {
      input
    }: {
      input: {
        phoneNumberToken: string;
        address: string;
      };
    },
    ctx: Context,
    info
  ) {
    try {
      const hashedPhoneNumber = await validatePhoneNumberToken(
        input.phoneNumberToken
      );

      return {
        ok: true,
        phoneNumber: ctx.db.mutation.upsertPhoneNumber(
          {
            create: { hashedPhoneNumber, address: input.address },
            update: { address: input.address },
            where: { hashedPhoneNumber }
          },
          // a bit of a hack since I'm not sure what to do with info here
          `{
            hashedPhoneNumber
            address
            createdAt
            updatedAt
          }`
        )
      };
    } catch (err) {
      return { message: err.message, ok: false };
    }
  },
  async deletePhoneNumber(
    parent,
    {
      input
    }: {
      input: {
        phoneNumberToken: string;
      };
    },
    ctx: Context
  ) {
    try {
      const hashedPhoneNumber = await validatePhoneNumberToken(
        input.phoneNumberToken
      );

      await ctx.db.mutation.deletePhoneNumber({
        where: { hashedPhoneNumber }
      });

      return { ok: true };
    } catch (err) {
      return { message: err.message, ok: false };
    }
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
