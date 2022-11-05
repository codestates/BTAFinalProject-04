import { getInfoJWT, makeAccessToken } from "../middleware/authHandler";
import { Request, Response } from 'express';
import ApiResponse from '../utility/apiResponse';
import HttpStatusCodes from 'http-status-codes';

export default class BaseController {

    static getUID = ((req: Request) => {
        const { accesstoken }: any = req.headers;
        const { account } = getInfoJWT(accesstoken);
        const id = account;
        return id;
    });

    static async responseInsert(insertPromise: Promise<any>, res: Response) {
        const result = await insertPromise;
        ApiResponse.status(res, HttpStatusCodes.CREATED);
    }

    static async responseUpdate(updatePromsie: Promise<any>, res: Response) {
        const updateResult = await updatePromsie;
        if (updateResult.affectedRows === 1) {
            ApiResponse.status(res, HttpStatusCodes.OK);
        } else {
            ApiResponse.status(res, HttpStatusCodes.NO_CONTENT);
        }
    }

    static async responseList(selectPromise: Promise<{ rows: any; totalCount: any; }>, res: Response) {
        const data = await selectPromise;
        ApiResponse.result(res, data);
    }

    static async responseView(responseView: Promise<any>, res: Response) {
        const data = await responseView;

        if (data != null)
            ApiResponse.result(res, data);

        else
            ApiResponse.status(res, HttpStatusCodes.NO_CONTENT);
    }

}