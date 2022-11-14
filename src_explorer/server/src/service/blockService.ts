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
            const sql = 'INSERT INTO tbBlock (bNum, hash, timestamp, txTotalCount, gasLimit, gasUsed, size, difficulty, nonce, parentHash, receiptsRoot, stateRoot, txRoot) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            DB.execute('bta03_final', sql, [data.number, data.hash, data.timestamp, data.txTotalCount, data.gasLimit, data.gasUsed, data.size, data.difficulty, data.nonce, data.parentHash, data.receiptsRoot, data.stateRoot, data.transactionsRoot]);
        }
        catch (err) {
            throw(err);
        }
    }

    // 최신 Block에 리스트 DB에 저장
    static async updateBlockList() {
        try{
            web3 = Web3Util.setWeb3();
            let nextBlock : any;

            let lastBlock = await BlockService.getLastBlockNum();

            if(lastBlock === null) {
                nextBlock = await Web3Util.getLatestBlockNumber();
            }
            else {
                nextBlock = lastBlock.bNum + 1;
            }

            let recentBlockInfo = await web3.eth.getBlock(nextBlock);
            let number = recentBlockInfo.number;
            let hash = recentBlockInfo.hash;
            let timestamp = recentBlockInfo.timestamp;
            let gasLimit = recentBlockInfo.gasLimit;
            let gasUsed = recentBlockInfo.gasUsed;
            let size = recentBlockInfo.size;
            let difficulty = recentBlockInfo.difficulty;
            let nonce = recentBlockInfo.nonce;
            let parentHash = recentBlockInfo.parentHash;
            let receiptsRoot = recentBlockInfo.receiptsRoot;
            let stateRoot = recentBlockInfo.stateRoot;
            let transactionsRoot = recentBlockInfo.transactionsRoot;
            let txTotalCount = recentBlockInfo.transactions.length;

            this.insert({ 
                number: number,
                hash: hash,
                timestamp: timestamp,
                txTotalCount: txTotalCount,
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

            // txHash 저장
            for(let i = 0; i < recentBlockInfo.transactions.length; i++) {
                let txHash = recentBlockInfo.transactions[i];
                const transaction = await web3.eth.getTransaction(txHash);
                const blockTimestamp = timestamp;

                let { 
                    hash,
                    blockNumber,
                    blockHash,
                    from,
                    to,
                    gas,
                    gasPrice,
                    nonce,
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
                    timestamp: blockTimestamp
                });
                
            }
        }
        catch(err: any) {
            console.log(err);
        }
    }
}