import lightwallet from 'eth-lightwallet'
import * as bip39 from 'bip39';
import Web3 from 'web3';
import HDKey from 'hdkey';
import BlcokchainUtil from '../utility/BlockchainUtil';
import ApiResponse from '../utility/apiResponse';
const BN = require('bn.js');

let keyStoreInstance : any;

// harmony 메인넷
const providerAddressMainnet = "https://api.harmony.one";
// harmony 테스트넷
const providerAddressTestnet = "https://api.s0.b.hmny.io"

export default class WalletService {

    static async generateMnemonicCode() {    
        try {
            let mnemomic = lightwallet.keystore.generateRandomSeed();
            return mnemomic;    
        }   
        catch (err) {
            throw(err);
        } 
    }

    static async createWallet(password: string, mnemonicPhrase: string, res: any) {  
        try {

            lightwallet.keystore.createVault(
                {
                    password,
                    seedPhrase: mnemonicPhrase,
                    hdPathString: "m/0'/0'/0'",
                },
                function (err: any, ks: any) {
                    keyStoreInstance = ks;
                    keyStoreInstance.keyFromPassword(password, async (err: any, pwDerivedKey: any) => {
                        keyStoreInstance.generateNewAddress(pwDerivedKey, 1);
                        const walletAddress = keyStoreInstance.getAddresses().toString() as string;

                        return ApiResponse.result(res, { walletAddress: walletAddress }, 201);
                    });
                }
            );
        }      
        catch (err) {
            throw(err);
        }
    }

    static async setLightWallet(password: string, mnemonicPhrase: string) {  
        try {

            lightwallet.keystore.createVault(
                {
                    password,
                    seedPhrase: mnemonicPhrase,
                    hdPathString: "m/0'/0'/0'",
                },
                function (err: any, ks: any) {
                    keyStoreInstance = ks;
                    keyStoreInstance.keyFromPassword(password, async (err: any, pwDerivedKey: any) => {
                        keyStoreInstance.generateNewAddress(pwDerivedKey, 1);
                        return 
                    });
                }
            );
        }      
        catch (err) {
            throw(err);
        }
    }

    // 잔고조회 OK
    static async balanceOf(walletAddress: string, network: string) {    
        try {
            let providerAddress : string  = providerAddressTestnet;
            if (network === "harmonyMainnet") providerAddress = providerAddressMainnet;

            let web3 = new Web3(new Web3.providers.HttpProvider(providerAddress));

            let result = await web3.eth.getBalance(walletAddress);
            let balance : any = Web3.utils.fromWei(result, 'ether');  
            return balance;
        }   
        catch (err) {
            throw(err);
        } 
    }

    // 개인키 반환
    static async getPrivatekey(password: string, res: any) {    
        try {
            keyStoreInstance.keyFromPassword(password, (err: any, pwDerivedKey: any) => {
                const walletAddress = keyStoreInstance.addresses[0];
                const privateKey = keyStoreInstance.exportPrivateKey(walletAddress, pwDerivedKey);

                return ApiResponse.result(res, { privateKey: privateKey }, 200);
            });
        }   
        catch (err) {
            throw(err);
        } 
    }

    // 개인키 반환
    static async getMyMnemonic(password: string, res: any) {    
        try {
            keyStoreInstance.keyFromPassword(password, async (err: any, pwDerivedKey: any) => {
                const mnemonic = keyStoreInstance.getSeed(pwDerivedKey)
                return ApiResponse.result(res, { mnemonic: mnemonic }, 200);
            })
        }   
        catch (err) {
            throw(err);
        } 
    }

    // 송신자의 privatekey 생성을 어떻게 해야될지 정해야됨!
    // 1. front에서 받을 것인지
    // 2. fromAddress를 전달받았을 때, back에서 privatekey를 찾을 것인지...  
    static async transfer(fromAddress: string, toAddress: string, amount: string, password: string, network: string, mnemonicPhrase: string, res: any) {        
        try {
            let providerAddress : string  = providerAddressTestnet;
            if (network === "harmonyMainnet") providerAddress = providerAddressMainnet;
            let web3 = new Web3(new Web3.providers.HttpProvider(providerAddress));
            const balance = await this.balanceOf(fromAddress, network);

            if(amount >= balance)
                throw new Error('insufficient balance');

            if(keyStoreInstance === undefined) {
                await this.setLightWallet(password, mnemonicPhrase);
            }

            console.log(keyStoreInstance);

            keyStoreInstance.keyFromPassword(password, async (err: any, pwDerivedKey: any) => {
                const walletAddress = keyStoreInstance.addresses[0];
                const privateKey = Buffer.from(keyStoreInstance.exportPrivateKey(walletAddress, pwDerivedKey), "hex");
                const nonce = await web3.eth.getTransactionCount(fromAddress as string, 'pending');

                const gasPrice = new BN(await web3.eth.getGasPrice()).mul(new BN(1));

                const params = {
                    nonce: nonce,
                    value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
                    gasPrice: gasPrice,
                    gasLimit: 6721900,
                    to: toAddress,
                };

                await BlcokchainUtil.sendSignedTransaction(params, privateKey, web3, res);
            });

        }   
        catch (err) {
            throw(err);
        } 
    }

}  