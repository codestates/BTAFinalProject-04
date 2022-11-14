import ApiResponse from '../utility/apiResponse';
import Util from '../utility/util';
import IController from '../interface/IController';
import BaseController from './baseController';
import TransactionService from '../service/transactionService';

export default class TransactionController extends BaseController {

    static select : IController = async (req, res) => {
        const txHash = Util.String(req.query.txHash);
        try {
            let txInfo = await TransactionService.select({ txHash: txHash });
            ApiResponse.result(res, txInfo, 200);
        }
        catch (err: any) {
            err.source = "TransactionController:select";
            ApiResponse.error(res, err);
        }
    }

    static list : IController = async (req, res) => {
        const limit = Util.Number(req.query.limit);
        const offset = Util.Number(req.query.offset);
        try {
            let data = await TransactionService.list({ limit: limit, offset: offset });
            ApiResponse.result(res, data, 200);
        }
        catch (err: any) {
            err.source = "TransactionController:list";
            ApiResponse.error(res, err);
        }
    }
}