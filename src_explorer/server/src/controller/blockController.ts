import ApiResponse from '../utility/apiResponse';
import Util from '../utility/util';
import IController from '../interface/IController';
import BaseController from './baseController';
import BlockService from '../service/blockService';

export default class BlockController extends BaseController {

    static select : IController = async (req, res) => {
        const blockNum = Util.Number(req.query.bNum);
        try {
            let blockInfo = await BlockService.select({ blockNum: blockNum });
            ApiResponse.result(res, blockInfo, 200);
        }
        catch (err: any) {
            err.source = "BlockchainController:select";
            ApiResponse.error(res, err);
        }
    }

    static list : IController = async (req, res) => {
        const limit = Util.Number(req.query.limit);
        const offset = Util.Number(req.query.offset);
        try {
            let blockList = await BlockService.list({ limit: limit, offset: offset });
            ApiResponse.result(res, blockList, 200);
        }
        catch (err: any) {
            err.source = "BlockController:list";
            ApiResponse.error(res, err);
        }
    }
}