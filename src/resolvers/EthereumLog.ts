import { EthereumNetwork, web3, Web3Log } from "../web3/client";

export const EthereumLog = {
  address(parent: Web3Log) {
    return { hash: parent.address, network: parent.network };
  }
};
