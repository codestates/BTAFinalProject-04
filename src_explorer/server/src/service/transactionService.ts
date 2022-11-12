import DB from '../utility/dbUtil';
import Web3Util from '../utility/web3Util';
import axios from 'axios';

let web3;

export default class TransactionService {

    static async select(data: any) {
        try {
            const sql = 'SELECT *FROM tbTransaction WHERE txHash = ?'
            return await DB.select('bta03_final', sql, [data.txHash]);
        }
        catch (err) {
            throw(err);
        }
    }

    static async list(data: any) {
        try {
            const sql = 'CALL spGetTransactionList(?, ?)'
            return await DB.listCountSP('bta03_final', sql, [data.limit, data.offset]);
        }
        catch (err) {
            throw(err);
        }
    }

    static async insert(data: any) {
        try {
            // const sql = 'INSERT INTO tbTransaction (txHash, bNum, bHash, fromAddress, toAddress, gas, gasPrice, nonce, timestamp) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
            // DB.execute('bta03_final', sql, [data.txHash, data.bNum, data.bHash, data.fromAddress, data.toAddress, data.gas, data.gasPrice, data.nonce, data.timestamp]);

            const sql = 'INSERT INTO tbTransaction (txHash, bNum, bHash, fromAddress, toAddress, gas, gasPrice, nonce) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
            DB.execute('bta03_final', sql, [data.txHash, data.bNum, data.bHash, data.fromAddress, data.toAddress, data.gas, data.gasPrice, data.nonce]);
        }
        catch (err) {
            throw(err);
        }
    }

    // // 최신 Block에 리스트 DB에 저장
    // static async updateTransactionList() {
    //     try{

    //         let body = {
    //             jsonrpc: "2.0",
    //             method: "hmyv2_getTransactionReceipt",
    //             params: ["0x7a8ac2207e47e29a55c6e0495cd1cb317d5791a0a68ded889db736e02c9b71c9"],
    //             id: 1,
    //         }

    //         // let newBody = JSON.stringify(body);

    //         let result = await axios.post("https://api.s0.t.hmny.io", body);

    //         console.log("result:", result);

    //         // console.log("------1");
    //         // web3 = Web3Util.setWeb3();

    //         // const lastBlockNumber = await web3.eth.getBlockNumber();
    //         // console.log('Last block number: ', lastBlockNumber);


    //         // let block = await web3.eth.getBlock(33605826);

    //         // console.log("list----:", block.transactions);
    //         // console.log("len----:", block.transactions.length);

    //         // for(let i = 0; i < block.transactions.length; i++) {

    //         //     const lastTransaction = block.transactions[i];
    //         //     console.log('Last transaction hash: ', lastTransaction);

    //         //     // const transaction = await web3.eth.getTransaction(lastTransaction);
    //         //     const transaction = await web3.eth.getTransactionReceipt(lastTransaction);
                
    //         //     console.log('Last transaction: ', transaction);
    //         //     console.log('Last transaction topics: ', transaction.logs[0].topics);

    //         // }

    //         // hmy.blockchain
    //         // .getTransactionByHash({
    //         //     txnHash: '0x162910062fd51dde648039cabaaaf8e28f25cf95fd040926848efdc9fb2cbf7f',
    //         // })
    //         // .then((response: any) => {
    //         //     console.log(response.result);
    //         // });

            

    //         // let lastBlock = await Web3Util.getBlockInfo();

    //         // console.log("lastBlock:", lastBlock);

    //         // // let lastTransaction = await lastBlock.transactions[lastBlock.transactions.length - 1];
    //         // // console.log("last transaction hash:", lastTransaction);

    //         // const transaction = await web3.eth.getTransaction("0x8178cdb0739fb0b1fa552be9cb7bcdf2d1c57d28c063cdb86945a0807cf67e4d");

    //         // console.log("transaction info:", transaction);

    //         console.log("------2");
    //     }
    //     catch(err: any) {
    //         throw(err)
    //     }
    // }
}