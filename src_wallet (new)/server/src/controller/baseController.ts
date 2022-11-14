import { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import ApiResponse from '../utility/apiResponse';

export default class BaseController{

    static async responseInsert(insertPromise : Promise<any> | null, res : Response) {
        const result = await insertPromise;
        ApiResponse.status(res, HttpStatusCodes.CREATED);        
    }

    static async responseUpdate(updatePromsie : Promise<any>, res : Response) {
        const updateResult = await updatePromsie;
        if (updateResult.affectedRows === 1) {
            ApiResponse.status(res, HttpStatusCodes.OK);
        } else {
            ApiResponse.status(res, HttpStatusCodes.NO_CONTENT);
        }    
    }
}