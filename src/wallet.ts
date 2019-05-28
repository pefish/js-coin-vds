import 'js-node-assist'
import BaseWalletHelper from '@pefish/js-coin-btc/lib/base/base_bitcoinjs_lib'
import ErrorHelper from 'p-js-error'

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
}
