import HttpStatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utility/apiError';

export interface IError {
    status?: number;
    code?: string;
    message?: string;
}


/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function notFoundErrorHandler( req: Request,  res: Response,  next: NextFunction,) {
    res.status(HttpStatusCodes.NOT_FOUND).end(); 
}

/**
 * Generic error response middleware
 *
 * @param  {object}   err
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function errorHandler( err: ApiError,  req: Request,  res: Response,  next: NextFunction,) {

    res.status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,   
        code: err.code || HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message:
            err.message ||
            HttpStatusCodes.getStatusText(HttpStatusCodes.INTERNAL_SERVER_ERROR),
    });
}