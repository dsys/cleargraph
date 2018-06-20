import { callMethodSafe } from "../web3/contracts";

export const EthereumContractMethod = {
  call(parent, args) {
    return callMethodSafe(
      parent.contract,
      parent.methodSignature,
      args.inputs || []
    );
  }
};
