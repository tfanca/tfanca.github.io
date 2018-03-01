import config from '../config.js';
import EtherverseABI from '../abi/EtherVerse.json';

const ContractStates = Object.freeze({
    NONE: 'not ready',
    INIT: 'initializing',
    READY: 'ready',
    FAIL: 'fail',
});

let constructorLock = true;
class SmartContracts {
    constructor(config) {
        if (constructorLock)
            throw new Error('do not use new SmartContract.  use await SmartContracts.create()');

        this.config = null;
        this.web3 = null;
        this.EtherVerse = null;
        this.state = ContractStates.NONE;

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        var Web3 = require('web3');
        if (typeof window.web3 !== 'undefined') {
            this.web3 = new Web3(window.web3.currentProvider);
            // console.log("web3js:", this.web3);
        } else {
            console.log('No web3? You should consider trying MetaMask!')
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
        }
    }

    static async create(config) {
        constructorLock = false;
        const contract = new SmartContracts(config);
        constructorLock = true;

        await contract._initialize();
        return contract;
    }

    async _initialize() {
        this.state = ContractStates.INIT;

        //get network
        let netId = await this.web3.eth.net.getId();
        switch (netId) {
            case 1:
                // console.log('This is mainnet');
                break
            case 2:
                console.log('This is the deprecated Morden test network.');
                return false;
            case 3:
                console.log('This is the ropsten test network.');
                break
            case 4:
                console.log('This is the Rinkeby test network.');
                this.config = config.networks.rinkeby;
                break
            case 42:
                console.log('This is the Kovan test network.');
                break
            default:
                console.log('This is an unknown network:', netId);
                return false;
        }

        // initialize contracts
        this.EtherVerse = new this.web3.eth.Contract(EtherverseABI, this.config.contractAddress);

        // sanity check
        // this.EtherVerse.        
        return true;
    }

    getEtherVerse() {
        return this.EtherVerse;
    }

    getCoinbaseAddress() {
        return this.web3.eth.getCoinbase();
    }

    getWeb3() {
        return this.web3;
    }

    getTransactionReceiptMined(tx, interval, tryCount) {
        let self = this; //hoist
        let attempts = 0;
        const transactionReceiptAsync = function (resolve, reject) {
            if (attempts > tryCount) {
                reject('too many attempts, tx confirmation failed');
            }
            console.log('attempt: ', attempts)
            attempts++;
            self.web3.eth.getTransactionReceipt(tx.transactionHash, (error, receipt) => {
                if (error) {
                    reject(error);
                } else if (receipt == null) {
                    console.log('null receipt: ', receipt);
                    setTimeout(
                        () => transactionReceiptAsync(resolve, reject),
                        interval ? interval : 500);
                } else {
                    resolve(receipt);
                }
            });
        };

        // if (Array.isArray(txHash)) {
        //     return Promise.all(txHash.map(
        //         oneTxHash => self.web3.eth.getTransactionReceiptMined(oneTxHash, interval)));
        // } else 
        if (typeof tx.transactionHash === "string") {
            return new Promise(transactionReceiptAsync);
        } else {
            throw new Error("Invalid Type: " + tx);
        }
    };
}

export default SmartContracts;