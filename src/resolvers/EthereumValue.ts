import { BigNumber } from "bignumber.js";
import { EthereumNetwork, web3 } from "../web3/client";

const fromWei = web3.MAINNET.utils.fromWei;

// don't repeat yourse... ah screw it.
export const EthereumValue = {
  display(v, args: { precision: number }) {
    const precision = args.precision || 3;
    const n = new BigNumber(v);
    if (n.isGreaterThan("50000000000000000")) {
      return n.dividedBy("1000000000000000000").toFixed(precision) + " ETH";
    } else if (n.isGreaterThan("50000000000000")) {
      return n.dividedBy("1000000000000000").toFixed(precision) + " mETH";
    } else if (n.isGreaterThan("50000000000")) {
      return n.dividedBy("1000000000000").toFixed(precision) + " nETH";
    } else if (n.isGreaterThan("50000000")) {
      return n.dividedBy("1000000000").toFixed(precision) + " Gwei";
    } else if (n.isGreaterThan("50000")) {
      return n.dividedBy("1000000").toFixed(precision) + " Kwei";
    } else {
      return n.toString() + " wei";
    }
  },
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
