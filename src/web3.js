const Web3 = require('web3');

const ETHEREUM_NETWORKS = ['MAINNET', 'ROPSTEN', 'KOVAN', 'RINKEBY'];
const web3Connections = [];
for (const network of ETHEREUM_NETWORKS) {
  web3Connections[network] = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
    )
  );
}

async function getBlock({ hash, number, network = 'MAINNET' }) {
  const block = await web3Connections[network].eth.getBlock(hash || number);
  if (!block) return null;
  block.network = network;
  return block;
}

async function getTransaction({ hash, network = 'MAINNET' }) {
  const tx = await web3Connections[network].eth.getTransaction(hash);
  if (!tx) return null;
  tx.network = network;
  return tx;
}

module.exports = { web3: web3Connections, getBlock, getTransaction };
