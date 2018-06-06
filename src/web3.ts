import * as DataLoader from "dataloader";
import * as Web3 from "web3";

export enum EthereumNetwork { MAINNET, ROPSTEN, KOVAN, RINKEBY }

export const web3: { [EthereumNetwork: string]: any } = {};
for (const network in EthereumNetwork) {
  if (!isNaN(Number(network))) { continue; }
  web3[network] = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/${process.env.INFURA_API_KEY}`,
    ),
  );
}

export interface Web3HashRequest {
  hash: string;
  network?: EthereumNetwork;
}

export interface Web3BlockRequest {
  hash?: string;
  number?: number;
  network?: EthereumNetwork;
}

export interface Web3Address {
  hash: string;
  network: EthereumNetwork;
}

export interface Web3Block {
  parentHash: string;
  miner: string;
  network: EthereumNetwork;
  transactions: string[];
  uncles: string[];
}

export interface Web3Transaction {
  network: EthereumNetwork;
  blockHash: string;
  from: string;
  to: string;
}

export function createWeb3Loaders() {
  return {
    balance: new DataLoader<Web3HashRequest, number | null>((inputs) => {
      return Promise.all(inputs.map(({ hash, network = "MAINNET" }) => {
        return web3[network].eth.getBalance(hash);
      }));
    }),
    block: new DataLoader<Web3BlockRequest, Web3Block>((inputs) => {
      return Promise.all(inputs.map(async (i) => {
        const network = i.network || "MAINNET";
        const block = await web3[network].eth.getBlock(i.hash || i.number);
        if (!block) { return null; }
        block.network = network;
        return block;
      }));
    }),
    blockTransactionCount: new DataLoader<Web3HashRequest, number | null>((inputs) => {
      return Promise.all(inputs.map(({ hash, network = "MAINNET" }) => {
        return web3[network].eth.getBlockTransactionCount(hash);
      }));
    }),
    transaction: new DataLoader<Web3HashRequest, Web3Transaction>((inputs) => {
      return Promise.all(inputs.map(async ({ hash, network = "MAINNET" }) => {
        const tx = await web3[network].eth.getTransaction(hash);
        if (!tx) { return null; }
        tx.network = network;
        return tx;
      }));
    }),
    transactionCount: new DataLoader<Web3HashRequest, number | null>((inputs) => {
      return Promise.all(inputs.map(({ hash, network = "MAINNET" }) => {
        return web3[network].eth.getTransactionCount(hash);
      }));
    }),
  };
}
