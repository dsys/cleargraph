import * as DataLoader from "dataloader";
import { resolveEthereumAddress } from "./address";
import {
  EthereumNetwork,
  web3,
  Web3Address,
  Web3Block,
  Web3Transaction
} from "./client";

export interface Web3HashRequest {
  hash: string;
  network: EthereumNetwork;
}

export interface Web3BlockRequest {
  hash?: string;
  number?: number;
  network: EthereumNetwork;
}

export function createWeb3Loaders() {
  return {
    address: new DataLoader<Web3HashRequest, Web3Address | null>(inputs => {
      return Promise.all(inputs.map(resolveEthereumAddress));
    }),
    balance: new DataLoader<Web3HashRequest, number | null>(inputs => {
      return Promise.all(
        inputs.map(({ hash, network }) => {
          return web3[network].eth.getBalance(hash);
        })
      );
    }),
    block: new DataLoader<Web3BlockRequest, Web3Block>(inputs => {
      return Promise.all(
        inputs.map(async i => {
          const block = await web3[i.network].eth.getBlock(i.hash || i.number);
          if (!block) {
            return null;
          }
          block.network = i.network;
          return block;
        })
      );
    }),
    blockTransactionCount: new DataLoader<Web3HashRequest, number | null>(
      inputs => {
        return Promise.all(
          inputs.map(async ({ hash, network }) => {
            return web3[network].eth.getBlockTransactionCount(hash);
          })
        );
      }
    ),
    transaction: new DataLoader<Web3HashRequest, Web3Transaction>(inputs => {
      return Promise.all(
        inputs.map(async ({ hash, network }) => {
          const tx = await web3[network].eth.getTransaction(hash);
          if (!tx) {
            return null;
          }
          tx.network = network;
          return tx;
        })
      );
    }),
    transactionCount: new DataLoader<Web3HashRequest, number | null>(inputs => {
      return Promise.all(
        inputs.map(async ({ hash, network }) => {
          return web3[network].eth.getTransactionCount(hash);
        })
      );
    })
  };
}
