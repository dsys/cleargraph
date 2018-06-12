import * as namehash from "eth-ens-namehash";
import { EthereumNetwork, web3 } from "../client";
import { registryInterface, resolverInterface } from "./abi";

export const ENS_CONTRACT_ADDRESSES: { [EthereumNetwork: string]: string } = {
  MAINNET: "0x314159265dd8dbb310642f98f50c066173c1259b",
  RINKEBY: "0xe7410170f87102df0055eb195163a03b7f2bff4a",
  ROPSTEN: "0x112234455c3a32fd11230c42e7bccd4a84e02010",
};

export const ens: { [EthereumNetwork: string]: any } = {};
for (const network in ENS_CONTRACT_ADDRESSES) {
  if (!isNaN(Number(network))) {
    continue;
  }
  ens[network] = new web3[network].eth.Contract(
    registryInterface,
    ENS_CONTRACT_ADDRESSES[network],
  );
}

export async function resolveENSAddress(network, host) {
  const nh = namehash.hash(host);
  const registry = ens[network];
  if (!registry) {
    return null;
  }

  const resolverAddr = await registry.methods.resolver(nh).call();
  if (resolverAddr === "0x0000000000000000000000000000000000000000") {
    return null;
  }

  const resolverContract = new web3[network].eth.Contract(
    resolverInterface,
    resolverAddr,
  );

  const addr = await resolverContract.methods.addr(nh).call();
  return { hash: addr.toLowerCase(), network };
}
