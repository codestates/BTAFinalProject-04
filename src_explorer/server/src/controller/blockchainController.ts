import ApiResponse from '../utility/apiResponse';
import Util from '../utility/util';
import IController from '../interface/IController';
import BaseController from './baseController';
import Web3Util from '../utility/web3Util';

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
}