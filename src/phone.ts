import * as fetch from "node-fetch";
import * as qs from "qs";
import { DEFAULT_REDIS_CLIENT } from "./redis";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_API_KEY = process.env.TWILIO_API_KEY;
const SEND_MESSAGE_URL = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
const TWILIO_AUTHORIZATION =
  "Basic " +
  Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_API_KEY}`).toString("base64");
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER;
const CODE_LENGTH = 6;
const CODE_TIMEOUT = 60 * 30; // 30 mins in seconds
const MAX_ATTEMPTS = 5;
const REQUEST_TIMEOUT = 5 * 1000;

export function generateRandomVerificationCode(
  length: number = CODE_LENGTH,
): string {
  return Math.round(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(CODE_LENGTH, "0");
}

export function generateTextMessage(
  verificationCode: string,
): string {
  return `Your Multi verification code is: ${verificationCode}`;
}

export async function startPhoneNumberVerification(
  phoneNumber: string,
): Promise<void> {
  const redisKey = `phoneVerificationCodes:${phoneNumber}`;
  const verificationCode = generateRandomVerificationCode();
  await DEFAULT_REDIS_CLIENT.hmsetAsync(redisKey, {
    attemptsLeft: MAX_ATTEMPTS,
    verificationCode,
  });

  await DEFAULT_REDIS_CLIENT.expireAsync(redisKey, CODE_TIMEOUT);
  const body = generateTextMessage(verificationCode);

  const res = await fetch(SEND_MESSAGE_URL, {
    body: qs.stringify({
      Body: body,
      From: TWILIO_FROM_NUMBER,
      To: phoneNumber,
    }),
    headers: {
      "Authorization": TWILIO_AUTHORIZATION,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    timeout: REQUEST_TIMEOUT,
  });

  const resBody = await res.json();
  if (resBody.error_message) {
    throw new Error(resBody.error_message);
  }

  return;
}

export async function checkPhoneNumberVerificationCode(
  phoneNumber: string,
  verificationCode: string,
): Promise<void> {
  const redisKey = `phoneVerificationCodes:${phoneNumber}`;
  const data = await DEFAULT_REDIS_CLIENT.hgetallAsync(redisKey);
  if (!data) { throw new Error("verification code expired"); }

  const attemptsLeft = parseInt(data.attemptsLeft, 10);

  if (attemptsLeft === 0) {
    throw new Error("max attempts exceeded");
  }

  if (verificationCode !== data.verificationCode) {
    await DEFAULT_REDIS_CLIENT.hincrbyAsync(redisKey, "attemptsLeft", -1);
    throw new Error("incorrect verification code");
  }

  await DEFAULT_REDIS_CLIENT.delAsync([redisKey]);

  return;
}
