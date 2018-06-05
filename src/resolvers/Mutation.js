const { web3 } = require('../web3');

const Mutation = {
  async sendRawTransaction(parent, args, ctx) {
    const hash = await web3[args.network].eth.sendRawTransaction(args)
    return { hash, network: args.network }
  }
};

module.exports = { Mutation };
