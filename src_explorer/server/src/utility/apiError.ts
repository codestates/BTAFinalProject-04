import { Response } from 'express';

export default class ApiError extends Error {
    code : number | string;
    status : number;

    constructor(code : string | number, status : number, message : string) {
        super(message);
        this.code = code;        
        this.name = "ApiError";        
        this.status = status;
    }
}