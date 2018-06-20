export const EthereumContractMethod = {
  async call(parent, args) {
    return parent.contract.methods[parent.methodSignature](
      ...(args.inputs || [])
    ).call();
  }
};
