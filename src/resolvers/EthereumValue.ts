import { EthereumNetwork, web3 } from "../web3/client";

const fromWei = web3.MAINNET.utils.fromWei;

// don't repeat yourse... ah screw it.
export const EthereumValue = {
  Gwei: v => fromWei(v, "Gwei"),
  Kwei: v => fromWei(v, "Kwei"),
  Mwei: v => fromWei(v, "Mwei"),
  babbage: v => fromWei(v, "babbage"),
  ether: v => fromWei(v, "ether"),
  femtoether: v => fromWei(v, "femtoether"),
  finney: v => fromWei(v, "finney"),
  gether: v => fromWei(v, "gether"),
  grand: v => fromWei(v, "grand"),
  gwei: v => fromWei(v, "gwei"),
  kether: v => fromWei(v, "kether"),
  kwei: v => fromWei(v, "kwei"),
  lovelace: v => fromWei(v, "lovelace"),
  mether: v => fromWei(v, "mether"),
  micro: v => fromWei(v, "micro"),
  microether: v => fromWei(v, "microether"),
  milli: v => fromWei(v, "milli"),
  milliether: v => fromWei(v, "milliether"),
  mwei: v => fromWei(v, "mwei"),
  nano: v => fromWei(v, "nano"),
  nanoether: v => fromWei(v, "nanoether"),
  picoether: v => fromWei(v, "picoether"),
  shannon: v => fromWei(v, "shannon"),
  szabo: v => fromWei(v, "szabo"),
  tether: v => fromWei(v, "tether"),
  wei: v => fromWei(v, "wei")
};
