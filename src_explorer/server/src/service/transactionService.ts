import DB from '../utility/dbUtil';

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
            const sql = 'INSERT INTO tbTransaction (txHash, bNum, bHash, fromAddress, toAddress, gas, gasPrice, nonce, timestamp) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
            DB.execute('bta03_final', sql, [data.txHash, data.bNum, data.bHash, data.fromAddress, data.toAddress, data.gas, data.gasPrice, data.nonce, data.timestamp]);
        }
        catch (err) {
            throw(err);
        }
    }
}