import ApiResponse from '../utility/apiResponse';
import Util from '../utility/util';
import IController from '../interface/IController';
import BaseController from './baseController';
import Web3Util from '../utility/web3Util';
import BlockService from '../service/blockService';

export default class BlockchainController extends BaseController {

    static blockInfo : IController = async (req, res) => {
        try {
            let blockInfo = await Web3Util.getBlockInfo();
            ApiResponse.result(res, blockInfo, 200);
        }
        catch (err: any) {
            err.source = "BlockchainController:blockInfo";
            ApiResponse.error(res, err);
        }
    }

    static select : IController = async (req, res) => {
        const blockNum = Util.Number(req.query.blockNum);
        try {
            let blockInfo = await BlockService.select({ blockNum: blockNum });
            ApiResponse.result(res, blockInfo, 200);
        }
        catch (err: any) {
            err.source = "BlockchainController:select";
            ApiResponse.error(res, err);
        }
    }
}