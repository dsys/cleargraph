import * as fetch from "node-fetch";
import * as qs from "qs";
import { EthereumNetwork } from "./client";

export const ETHERSCAN_API_BASE_URLS: { [EthereumNetwork: string]: string } = {
  KOVAN: "http://api-kovan.etherscan.io/api",
  MAINNET: "http://api.etherscan.io/api",
  RINKEBY: "http://api-rinkeby.etherscan.io/api",
  ROPSTEN: "http://api-ropsten.etherscan.io/api"
};

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

export async function fetchTransactions({
  network,
  address,
  startBlock,
  endBlock,
  page,
  offset
}: {
  network: EthereumNetwork;
  address: string;
  startBlock: number;
  endBlock: number;
  page: number;
  offset: number;
}) {
  const baseURL = ETHERSCAN_API_BASE_URLS[network];
  const q = qs.stringify({
    action: "txlist",
    address,
    apikey: ETHERSCAN_API_KEY,
    endblock: endBlock,
    module: "account",
    offset,
    page,
    startblock: startBlock
  });

  const res = await fetch(`${baseURL}?${q}`);
  if (!res.ok) {
    throw new Error("could not fetch transactions");
  }

  const resBody = await res.json();
  if (!resBody.result) {
    throw new Error("could not fetch transactions");
  }

  return resBody.result.map(r => r.hash);
}
