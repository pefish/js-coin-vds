import '@pefish/js-node-assist';
import BaseWalletHelper from '@pefish/js-coin-btc/lib/base/base_bitcoinjs_lib';
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
    fromBase58Check(address: any): {
        version: any;
        hash: any;
    };
    verifyAddressType(address: any, type?: string, network?: string): boolean;
}
