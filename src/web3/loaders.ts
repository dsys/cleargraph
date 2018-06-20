import * as DataLoader from "dataloader";
import { resolveEthereumAddress } from "./address";
import {
  EthereumNetwork,
  web3,
  Web3Address,
  Web3Block,
  Web3Transaction,
  Web3TransactionReceipt
} from "./client";
import {
  ETHEREUM_CONTRACT_STANDARD_ABIS,
  EthereumContractStandard
} from "./standards";

export interface Web3HashRequest {
  hash: string;
  network: EthereumNetwork;
}

export interface Web3BlockRequest {
  hash?: string;
  number?: number;
  network: EthereumNetwork;
}

export interface Web3ContractRequest {
  hash: string;
  network: EthereumNetwork;
  interface: {
    standards: EthereumContractStandard[];
    inline: any[];
  };
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
    contract: new DataLoader<Web3ContractRequest, any>(async inputs =>
      inputs.map(input => {
        try {
          let jsonInterface = input.interface.inline || [];
          if (input.interface.standards) {
            for (const standard of input.interface.standards) {
              jsonInterface = jsonInterface.concat(
                ETHEREUM_CONTRACT_STANDARD_ABIS[standard]
              );
            }
          }

          const contract = new web3[input.network].eth.Contract(
            jsonInterface,
            input.hash
          );

          contract.network = input.network;
          return contract;
        } catch (err) {
          return new Error("invalid contract ABI");
        }
      })
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
    }),
    transactionReceipt: new DataLoader<Web3HashRequest, Web3TransactionReceipt>(
      inputs => {
        return Promise.all(
          inputs.map(async ({ hash, network }) => {
            const receipt = await web3[network].eth.getTransactionReceipt(hash);
            if (!receipt) {
              return null;
            }
            receipt.network = network;
            return receipt;
          })
        );
      }
    )
  };
}
