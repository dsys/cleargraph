import { ERC_20_ABI } from "./abis/erc20";
import { ERC_721_ABI } from "./abis/erc721";
import { ERC_725_ABI } from "./abis/erc725";

export enum EthereumContractStandard {
  ERC_20,
  ERC_721,
  ERC_725
}

export const ETHEREUM_CONTRACT_STANDARD_ABIS = {
  ERC_20: ERC_20_ABI,
  ERC_721: ERC_721_ABI,
  ERC_725: ERC_725_ABI
};
