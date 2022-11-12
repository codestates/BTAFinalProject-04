import { Console } from 'winston/lib/winston/transports';
import DB from '../utility/dbUtil';
import Web3Util from '../utility/web3Util';
import TransactionService from './transactionService'

let web3;

export default class BlockService {

    static async select(data: any) {
        try {
            const sql = 'SELECT *FROM tbBlock WHERE bNum = ?'
            return await DB.select('bta03_final', sql, [data.blockNum]);
        }
        catch (err) {
            throw(err);
        }
    }

    static async list(data: any) {
        try {
            const sql = 'CALL spGetBlockList(?, ?)'
            return await DB.listCountSP('bta03_final', sql, [data.limit, data.offset]);
        }
        catch (err) {
            throw(err);
        }
    }

    static async getLastBlockNum() {
        try {
            const sql = 'SELECT bNum FROM tbBlock ORDER BY bNum DESC LIMIT 1;'
            return await DB.select('bta03_final', sql, []);
        }
        catch (err) {
            throw(err);
        }
    }

    static async insert(data: any) {
        try {
            const sql = 'INSERT INTO tbBlock (bNum, hash, timestamp, txHash, gasLimit, gasUsed, size, difficulty, nonce, parentHash, receiptsRoot, stateRoot, txRoot) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            DB.execute('bta03_final', sql, [data.number, data.hash, data.timestamp, data.transactions, data.gasLimit, data.gasUsed, data.size, data.difficulty, data.nonce, data.parentHash, data.receiptsRoot, data.stateRoot, data.transactionsRoot]);
        }
        catch (err) {
            throw(err);
        }
    }

    // 최신 Block에 리스트 DB에 저장
    static async updateBlockList() {
        try{
            console.log("-----------updateBlockList-----------");

            let { bNum } = await BlockService.getLastBlockNum();

            web3 = Web3Util.setWeb3();
            let lastBlock = await Web3Util.getLatestBlockNumber();

            console.log("dbLastBlock:", bNum );
            console.log("lastBlock:", lastBlock);
            
            // for(let i = bNum + 1; i <= lastBlock; i++) {
            for(let i = lastBlock; i <= lastBlock; i++) {

                let blockInfo = await web3.eth.getBlock(33652839);

                let number = blockInfo.number;
                let hash = blockInfo.hash;
                let timestamp = blockInfo.timestamp;
                let gasLimit = blockInfo.gasLimit;
                let gasUsed = blockInfo.gasUsed;
                let size = blockInfo.size;
                let difficulty = blockInfo.difficulty;
                let nonce = blockInfo.nonce;
                let parentHash = blockInfo.parentHash;
                let receiptsRoot = blockInfo.receiptsRoot;
                let stateRoot = blockInfo.stateRoot;
                let transactionsRoot = blockInfo.transactionsRoot;

                for(let j = 0; j < blockInfo.transactions.length; j++) {
                    let transactions = blockInfo.transactions[j];

                    console.log("transactions:", transactions);
                    const transaction = await web3.eth.getTransaction(transactions);

                    console.log("transaction----:", transaction);
                    console.log("transaction blockHash----:", transaction.blockHash);
                    let { 
                            hash,
                            blockNumber,
                            blockHash,
                            from,
                            to,
                            gas,
                            gasPrice,
                            nonce,
                            timestamp
                        } : any = transaction;
            
                    TransactionService.insert({
                        txHash: hash,
                        bNum: blockNumber,
                        bHash: blockHash,
                        fromAddress: from,
                        toAddress: to,
                        gas: gas,
                        gasPrice: gasPrice,
                        nonce: nonce,
                        timestamp: timestamp
                    });
                }

                // this.insert({ 
                //     number: number,
                //     hash: hash,
                //     timestamp: timestamp,
                //     transactions: transactions,
                //     gasLimit: gasLimit,
                //     gasUsed: gasUsed,
                //     size: size,
                //     difficulty: difficulty,
                //     nonce: nonce,
                //     parentHash: parentHash,
                //     receiptsRoot: receiptsRoot,
                //     stateRoot: stateRoot,
                //     transactionsRoot: transactionsRoot,
                // });
            } 
        }
        catch(err: any) {
            throw(err)
        }
    }
}