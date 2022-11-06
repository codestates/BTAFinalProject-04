import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx';
import logger from '../config/logger';
import BlockService from '../service/blockService';

let web3 : any;
// const chain : string = "baobab";

export default class Web3Util{

    static setWeb3 = () => {
        // https://api.s0.t.hmny.io
        // https://docs.harmony.one/home/developers/harmony-specifics/api
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

    // 최신 Block에 리스트 DB에 저장
    static async updateBlockList() {
        try{
            console.log("-----------updateBlockList-----------");

            let { bNum } = await BlockService.getLastBlockNum();

            console.log("dbLastBlock:", bNum );

            web3 = Web3Util.setWeb3();
            let lastBlock = await this.getLatestBlockNumber();
            
            for(let i = bNum + 1; i <= lastBlock; i++) {

                let blockInfo = await web3.eth.getBlock(i);

                let number = blockInfo.number;
                let hash = blockInfo.hash;
                let timestamp = blockInfo.timestamp;
                // 주의 추후에 1개 이상의 transaction인 경우 처리해야함
                let transactions = blockInfo.transactions[0];
                let gasLimit = blockInfo.gasLimit;
                let gasUsed = blockInfo.gasUsed;
                let size = blockInfo.size;
                let difficulty = blockInfo.difficulty;
                let nonce = blockInfo.nonce;
                let parentHash = blockInfo.parentHash;
                let receiptsRoot = blockInfo.receiptsRoot;
                let stateRoot = blockInfo.stateRoot;
                let transactionsRoot = blockInfo.transactionsRoot;

                BlockService.insert({ 
                    number: number,
                    hash: hash,
                    timestamp: timestamp,
                    transactions: transactions,
                    gasLimit: gasLimit,
                    gasUsed: gasUsed,
                    size: size,
                    difficulty: difficulty,
                    nonce: nonce,
                    parentHash: parentHash,
                    receiptsRoot: receiptsRoot,
                    stateRoot: stateRoot,
                    transactionsRoot: transactionsRoot,
                });
            } 
        }
        catch(err: any) {
            throw(err)
        }
    }
}