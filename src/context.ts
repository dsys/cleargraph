import { Prisma } from "./generated/prisma";
import { createWeb3Loaders } from "./web3/loaders";

export interface Context {
  db: Prisma;
  loaders: {
    web3: any;
  };
  req: any;
}

export function createContext(req): Context {
  return {
    db: new Prisma({
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
      // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
    }),
    loaders: { web3: createWeb3Loaders() },
    req,
  };
}
