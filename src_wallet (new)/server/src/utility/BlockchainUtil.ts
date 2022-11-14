const axios = require('axios').default;
import ApiResponse from '../utility/apiResponse';
import { Transaction } from 'ethereumjs-tx';

const chain = 'harmonyt';

export default class BlcokchainUtil {

    static async getCurrentGasPrices(){ 
        try {
            let response = await axios.get("https://www.gwei.at/api/gas")
            let gasPrice = response.data.gasData.gasPrices;
        
            return gasPrice; 
        }
        catch(err) {
            throw(err);
        }
    }

    static async sendSignedTransaction(params: any, fromPrivateKey: Buffer, web3: any, res: any) {
        try {           

            console.log("-----------");

            const tx = new Transaction(params, { chain: chain });
            tx.sign(fromPrivateKey);
            const serializedTx = tx.serialize();
            const raw = '0x' + serializedTx.toString('hex');

            await web3.eth.sendSignedTransaction(raw, (error: any, data: any) => {
                if(error) {
                    error.status = 400;
                    ApiResponse.error(res, error);
                }
                else {
                    ApiResponse.result(res, { txHash: data }, 201);
                }
            });

        }
        catch(err: any) {
            throw(err);
        }
    }
}