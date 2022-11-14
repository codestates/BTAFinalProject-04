import Web3 from 'web3';

// harmony 테스트넷
// const providerAddress = "http://localhost:8545"
const providerAddress = "http://localhost:9500"

export default class WalletService {

    static async getLatestBlock() {    
        try {
            let web3 = new Web3(new Web3.providers.HttpProvider(providerAddress));
            let lastBlock = await web3.eth.getBlockNumber();
            console.log("lastBlock:", lastBlock);
            return lastBlock;
        }   
        catch (err) {
            console.log(err);
            throw(err);
        } 
    }

}  