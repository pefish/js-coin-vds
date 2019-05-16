import BaseWalletHelper from 'js-btc/lib/base/base_bitcoinjs_lib';
declare global {
    namespace NodeJS {
        interface Global {
            logger: any;
        }
    }
}
export default class Wallet extends BaseWalletHelper {
    decimals: number;
    bitcoinLib: any;
    constructor();
    parseNetwork(network: any): object;
}
