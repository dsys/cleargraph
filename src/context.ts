import { createWeb3Loaders } from "./web3/loaders";

export interface Context {
  req: any;
  loaders: {
    web3: any,
  };
}

export function createContext(req) {
  return {
    ...req,
    loaders: { web3: createWeb3Loaders() },
  };
}
