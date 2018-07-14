import * as jwt from "jsonwebtoken";

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "nicetrynsa";
export const TOKEN_ALGORITHM = "HS512";

export async function generateToken(
  payload: object,
  expires: Date
): Promise<string> {
  return jwt.sign({ ...payload, exp: expires.getTime() / 1000 }, TOKEN_SECRET, {
    algorithm: TOKEN_ALGORITHM
  });
}

export async function verifyToken(token: string): Promise<any> {
  return jwt.verify(token, TOKEN_SECRET, { algorithms: [TOKEN_ALGORITHM] });
}
