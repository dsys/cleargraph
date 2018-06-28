import { EthereumNetwork, web3, Web3Address } from "./client";
import { resolveENSAddress } from "./ens/resolve";

export function isValidEthereumAddress(address: string): boolean {
  return web3.MAINNET.utils.isAddress(address);
}

export async function resolveEthereumAddress(req): Promise<Web3Address | null> {
  if (!req.address) {
    return null;
  }

  const address = req.address.toLowerCase();
  const network = req.network || EthereumNetwork.MAINNET;
  if (address.endsWith(".eth")) {
    return resolveENSAddress(network, address);
  } else if (isValidEthereumAddress(address)) {
    return { display: address, address, network };
  } else {
    return null;
  }
}
