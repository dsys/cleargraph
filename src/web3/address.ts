import { EthereumNetwork, Web3Address } from "./client";
import { resolveENSAddress } from "./ens/resolve";

export async function resolveEthereumAddress(req): Promise<Web3Address | null> {
  const hash = req.hash.toLowerCase();
  const network = req.network || EthereumNetwork.MAINNET;
  if (hash.endsWith(".eth")) {
    return resolveENSAddress(network, hash);
  } else if (hash.startsWith("0x")) {
    return { hash, network };
  } else {
    return null;
  }
}
