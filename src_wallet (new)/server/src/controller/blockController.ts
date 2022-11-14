import IController from '../interface/IController';
import BaseController from './baseController';
import ApiResponse from '../utility/apiResponse';
import BlockService from '../service/blockService';
import Util from '../utility/util';

export default class BlockController extends BaseController {         

    static latestBlock : IController = async (req, res) => {
        try {     
            const data = await BlockService.getLatestBlock();
            ApiResponse.result(res, data, 200);
        }
        catch (err: any) {            
            err.source = "BlockController:latestBlock";
            ApiResponse.error(res, err);
        }
    }

}