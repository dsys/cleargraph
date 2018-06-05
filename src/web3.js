const Web3 = require('web3');
const DataLoader = require('dataloader')

const ETHEREUM_NETWORKS = ['MAINNET', 'ROPSTEN', 'KOVAN', 'RINKEBY'];
const web3Connections = [];
for (const network of ETHEREUM_NETWORKS) {
  web3Connections[network] = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
    )
  );
}

function createWeb3Loaders() {
  return {
    balance: new DataLoader(inputs => {
      return Promise.all(inputs.map(({ hash, network = 'MAINNET' }) => {
        return web3Connections[network].eth.getBalance(hash);
      }))
    }),
    transactionCount: new DataLoader(inputs => {
      return Promise.all(inputs.map(({ hash, network = 'MAINNET' }) => {
        return web3Connections[network].eth.getTransactionCount(hash);
      }))
    }),
    blockTransactionCount: new DataLoader(inputs => {
      return Promise.all(inputs.map(({ hash, network = 'MAINNET' }) => {
        return web3Connections[network].eth.getBlockTransactionCount(hash);
      }))
    }),
    block: new DataLoader(inputs => {
      return Promise.all(inputs.map(async ({ hash, number, network = 'MAINNET' }) => {
        const block = await web3Connections[network].eth.getBlock(hash || number);
        if (!block) return null;
        block.network = network;
        return block;
      }))
    }),
    transaction: new DataLoader(inputs => {
      return Promise.all(inputs.map(async ({ hash, network = 'MAINNET' }) => {
        const tx = await web3Connections[network].eth.getTransaction(hash);
        if (!tx) return null;
        tx.network = network;
        return tx;
      }))
    })
  }
}

module.exports = { web3: web3Connections, createWeb3Loaders };
