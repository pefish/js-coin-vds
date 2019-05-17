import 'js-node-assist'
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

  it('getAllFromWif', async () => {
    try {
      const result = walletHelper.getAllFromWif('L5nNnEKwmb1Yxh6neMKn5Srum3NBjTpPtNHFpNPJS3Dqh2yTcsyy', mainnet)
      // logger.error(result)
      assert.strictEqual(result['publicKey'], '02f7166a1fd8dd1b253667c63af6e580d9867abe79e48d4df655c98b71fd81a8e8')
      assert.strictEqual(result['privateKey'], 'ff80e6800f8e0b9c27431f3cf6c4346175eaad12745a91bd41c7141e70c58378')
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getAddressFromPublicKey', async () => {
    try {
      const p2pkh = walletHelper.getAddressFromPublicKey('02f7166a1fd8dd1b253667c63af6e580d9867abe79e48d4df655c98b71fd81a8e8', `p2pkh`, mainnet)
      assert.strictEqual(p2pkh, `VcYTteXAxr3JbzptXLXcTkUfcueRuHJ7zEs`)
      const p2wpkh = walletHelper.getAddressFromPublicKey('02f7166a1fd8dd1b253667c63af6e580d9867abe79e48d4df655c98b71fd81a8e8', `p2wpkh`, mainnet)
      assert.strictEqual(p2wpkh, `vs1q2du0uhvgwmj9e7gn9en080j986gtvsa65336ke`)
      const segwit = walletHelper.getAddressFromPublicKey('02f7166a1fd8dd1b253667c63af6e580d9867abe79e48d4df655c98b71fd81a8e8', `p2sh(p2wpkh)`, mainnet)
      assert.strictEqual(segwit, `VsPav2arR2pKJ9qUsiFLRMLcD296SF5jNrj`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

