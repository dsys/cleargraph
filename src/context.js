const { createWeb3Loaders } = require('./web3');

function createContext(req) {
  return {
    ...req,
    loaders: { web3: createWeb3Loaders() }
  }
}

module.exports = { createContext }
