import { EthereumNetwork, web3, Web3Address } from "./client";
import { resolveENSAddress } from "./ens/resolve";

export function isValidEthereumAddress(address: string): boolean {
  return web3.MAINNET.utils.isAddress(address);
}

export async function resolveEthereumAddress(req): Promise<Web3Address | null> {
  const hash = req.hash.toLowerCase();
  const network = req.network || EthereumNetwork.MAINNET;
  if (hash.endsWith(".eth")) {
    return resolveENSAddress(network, hash);
  } else if (isValidEthereumAddress(hash)) {
    return { hash, network };
  } else {
    return null;
  }
}
