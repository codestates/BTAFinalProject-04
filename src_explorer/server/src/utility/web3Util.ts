import Web3 from 'web3';

let web3 : any;

export default class Web3Util{

    static setWeb3 = () => {
        return new Web3(new Web3.providers.HttpProvider("https://api.s0.t.hmny.io"));
    }

    // 최신 BlockNumber 조회
    static async getLatestBlockNumber() {
        try{
            web3 = Web3Util.setWeb3();
            return await web3.eth.getBlockNumber();                
        }
        catch(err: any) {
            throw(err)
        }
    }

    // 최신 Block에 대한 정보 조회
    static async getBlockInfo() {
        try{
            web3 = Web3Util.setWeb3();
            let lastBlock = await this.getLatestBlockNumber();
            let blockInfo = await web3.eth.getBlock(lastBlock);
            return blockInfo;

        }
        catch(err: any) {
            throw(err)
        }
    }
}