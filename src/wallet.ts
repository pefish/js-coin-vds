import '@pefish/js-node-assist'
import BaseWalletHelper from '@pefish/js-coin-btc/lib/base/base_bitcoinjs_lib'
import ErrorHelper from '@pefish/js-error'
import bs58check from 'bs58check'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

export default class Wallet extends BaseWalletHelper {
  decimals: number = 8;
  bitcoinLib: any

  public constructor () {
    super()
    this.bitcoinLib = require('@pefish/bitcoinjs-lib')
  }

  parseNetwork (network): object {
    if (network === `mainnet`) {
      return this.bitcoinLib.networks[`vds`]
    } else {
      throw new ErrorHelper(`network error`)
    }
  }

  fromBase58Check(address) {
    const payload = bs58check.decode(address);
    if (payload.length < 22)
        throw new TypeError(address + ' is too short');
    if (payload.length > 22)
        throw new TypeError(address + ' is too long');
    const version = payload.readUInt16BE(0);
    const hash = payload.slice(2);
    return { version, hash };
  }

  verifyAddressType (address, type = 'p2pkh', network = 'testnet') {
    const realNetwork = this.parseNetwork(network)
    let decode
    if (type === 'p2pkh') {
      try {
        decode = this.fromBase58Check(address)
      } catch (e) {}
      if (decode) {
        return decode.version === realNetwork[`pubKeyHash`]
      }
    } else if (type === 'p2sh(p2wpkh)' || type === 'p2sh(p2ms)' || type === 'p2sh(p2wsh(p2ms))') {
      try {
        decode = this.fromBase58Check(address)
      } catch (e) {}
      if (decode) {
        return decode.version === realNetwork[`scriptHash`]
      }
    }
    return false
  }
}
