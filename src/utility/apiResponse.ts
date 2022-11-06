import { Response } from 'express';
import HttpStatusCodes from 'http-status-codes';

import logger from '../config/logger';
import constant from '../constant';

export interface ICookie {
    key: string;
    value: string;
}

export default class ApiResponse {
    static result = (res: Response, data: any, status: number = 200, cookie: ICookie | null = null  ) => {

        res.status(status);
        if (cookie) {
          res.cookie(cookie.key, cookie.value);
        }
        res.json({
          success: true,
          data,          
        });
    };

    static reward = (res: Response, data: any, status: number = 200, cookie: ICookie | null = null  ) => {

        res.status(status);
        if (cookie) {
          res.cookie(cookie.key, cookie.value);
        }
        res.json({
          success: true,
          ...data,          
        });
    };

    static status = (res: Response, status : number) => {
        res.status(status).end();
    }

    static error = (
        res: Response,         
        error: any
    ) => {        

        if(     error.code === constant.ErrorCodes.DATA_TOO_LONG 
             || error.code === constant.ErrorCodes.DUPLICATE_ENTRY 
             || error.code === constant.ErrorCodes.DATA_TYPE_MISMATCH
             || error.code === constant.ErrorCodes.DATA_INVALID
             || error.code === constant.ErrorCodes 
          )  
             error.status = HttpStatusCodes.BAD_REQUEST;

             console.log("error.status:", error.status);
             console.log("error.code", error.code);
             console.log("error:", error);

        logger.error(error);
        res.status(error.status || 500).json({
            success: false,
            code : error.code || 500,
            message : error.message,
        });
    };                
}