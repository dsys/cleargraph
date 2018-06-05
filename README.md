# eth-explorer

Explore the Ethereum blockchain using a rich GraphQL API. [**Try it in your browser!**](https://www.graphqlbin.com/v2/nrk9s6)

Users want consistent experiences across platforms, but delivering this leads to headaches for developers of decentralized applications. Developers often end up duplicating Ethereum-related application logic between native and web-based clients to support the advanced functionalities of smart contracts, such as identity management and ENS address resolution.

`eth-explorer` is an extensible and general purpose GraphQL gateway for Ethereum. Thanks to the composability of GraphQL queries, its interface makes it convenient to walk the Ethereum blockchain from block to transaction to address, provides methods for common action such as retrieving address balances, supports inspecting/sending transactions, and more. Better yet, you can use it right within your browser. This library works by proxying requests via [web3](https://web3js.readthedocs.io/en/1.0/) to the wonderful [Infura](https://infura.io/docs) service, with caching handled using the [DataLoader pattern](https://github.com/facebook/dataloader). Its simple, stateless architecture lends itself toward extension: you can use `eth-explorer` as a starting point for your decentralized application's backend to support native and web clients.

This service has [or will have](https://github.com/dsys/eth-explorer/issues) first-class support for a number of existing or emerging standards in the Ethereum ecosystem, including:

* **ERC 20/ERC 721 support:** register token contracts with a curated registry and retrieve address balances and token metadata
* **Identity/multi-sig:** using the [solidity-sigutils](https://github.com/dsys/solidity-sigutils) library, eth-explorer will support compatible identity ERC 725 contracts, including ENS resolution
* **Filters via WebSockets:** flexible and resilient filters for Ethereum events backed by GraphQL subscriptions, making interactive dapps a breeze
* **Transaction cost estimation:** give end-users a notice of how much a transaction may cost in gas, ether, a token, or a fiat currency of choice
* **Deep contract analysis:** high-resolution analysis of trace calls and value transfers within contracts, also known as "internal transactions," via an instrumented EVM

## Usage

A hosted instance is available at [eth-explorer-gbirnihhso.now.sh][https://eth-explorer-gbirnihhso.now.sh].

```sh
git clone git@github.com:dsys/eth-explorer.git
cd eth-explorer
yarn install
yarn start # listening on localhost:4000
```

## Development

PRs welcome!

```sh
yarn dev
```

## License

Apache 2.0
