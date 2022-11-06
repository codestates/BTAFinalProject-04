import DB from '../utility/dbUtil';

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

    static async insert(data: any) {
        try {

            // console.log("data:", data);
            // const sql = 'SELECT *FROM tbBlock WHERE bNum = ?'
            // return await DB.select('bta03_final', sql, [data.blockNum]);
            const sql = 'INSERT INTO tbBlock (bNum, hash, timestamp, txHash, gasLimit, gasUsed, size, difficulty, nonce, parentHash, receiptsRoot, stateRoot, txRoot) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            DB.execute('bta03_final', sql, [data.number, data.hash, data.timestamp, data.transactions, data.gasLimit, data.gasUsed, data.size, data.difficulty, data.nonce, data.parentHash, data.receiptsRoot, data.stateRoot, data.transactionsRoot]);
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
}