import { Response } from 'express';
import HttpStatusCodes from 'http-status-codes';

import constant from '../constant';

export interface ICookie {
    key: string;
    value: string;
}

export default class ApiResponse {
    static result = (res: Response, data: any , status: number = 200, cookie: ICookie | null = null  ) => {

        res.status(status);
        if (cookie) {
          res.cookie(cookie.key, cookie.value);
        }
        res.json({
          success: true,
          data,          
        });
    };

    static status = (res: Response, status: number, message?: string) => {
        res.status(status).json({
            message : message,
        });
    }

    static error = (res: Response, error: any) => {        
        if(     error.code === constant.ErrorCodes.DATA_TOO_LONG 
             || error.code === constant.ErrorCodes.DUPLICATE_ENTRY 
             || error.code === constant.ErrorCodes.DATA_TYPE_MISMATCH 
          )  
             error.status = HttpStatusCodes.BAD_REQUEST;

        res.status(error.status || 500).json({
            success: false,
            message : error.message,
        });
    };                
}