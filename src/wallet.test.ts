import '@pefish/js-node-assist'
import BitcoinWalletHelper from './wallet'
import assert from 'assert'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

describe('bitcoinWalletHelper', () => {

  let walletHelper
  const testnet = 'testnet', mainnet = 'mainnet'

  before(async () => {
    walletHelper = new BitcoinWalletHelper()
  })

  it('isAddress', async () => {
    try {
      const result = walletHelper.isAddress('VcjXM5RuU4yugXckwXMhFHXF3Pm2ZTVqPgh', mainnet)
      global.logger.error(result)
      // assert.strictEqual(result['publicKey'], '0339c1597380ad680f5429e12d4b211d06dcdbd6f435ee1c14e48e326173edec59')
      // assert.strictEqual(result['privateKey'], '3df937ffe797c9d346f67d29dd6e939987511700ea37df8c7b834074720c7082')
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getAllFromWif', async () => {
    try {
      const result = walletHelper.getAllFromWif('KyJBMNrjQiKQWqs9m5rKofaMzS1t55BTvfk8r5x1HE6Zix2JtDan', mainnet)
      // global.logger.error(result)
      assert.strictEqual(result['publicKey'], '0339c1597380ad680f5429e12d4b211d06dcdbd6f435ee1c14e48e326173edec59')
      assert.strictEqual(result['privateKey'], '3df937ffe797c9d346f67d29dd6e939987511700ea37df8c7b834074720c7082')
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getAddressFromPublicKey', async () => {
    try {
      const p2pkh = walletHelper.getAddressFromPublicKey('0339c1597380ad680f5429e12d4b211d06dcdbd6f435ee1c14e48e326173edec59', `p2pkh`, mainnet)
      // global.logger.info(p2pkh)
      assert.strictEqual(p2pkh, `VcRVCGfuqe1n868gMSWzc6VgREDDM5tuNWT`)
      const p2wpkh = walletHelper.getAddressFromPublicKey('0339c1597380ad680f5429e12d4b211d06dcdbd6f435ee1c14e48e326173edec59', `p2wpkh`, mainnet)
      // global.logger.info(p2wpkh)
      assert.strictEqual(p2wpkh, `vs1qqmhnmqj0vyk4tkwzt0sfz0ncc89f02u96jaxk7`)
      const segwit = walletHelper.getAddressFromPublicKey('0339c1597380ad680f5429e12d4b211d06dcdbd6f435ee1c14e48e326173edec59', `p2sh(p2wpkh)`, mainnet)
      // global.logger.info(segwit)
      assert.strictEqual(segwit, `VsNvKUr8H6y3tmBbLCGiDbdQZxsXBKzjLBh`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

