//import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
//import { Tedis } from "tedis";

import IMiddleware from "../interface/IMiddleware";
import Config from '../config/config';
import logger from "../config/logger";

const magicKey = Config.server.magickey as string;
const expiresIn = Config.server.expire;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


const verifyKey = (token: string) => {
    try {
        let verifyJWT: any = jwt.verify(token, magicKey)
        return { code: 200, msg: "success" };
    }
    catch (err: any) {
        return err.name == 'TokenExpiredError' ? { code: "TOKEN_EXPIRE", msg: "token expire" } : { code: "TOKEN_INVALID", msg: "token invalid" }
    }
}

export const checkAuthToken: IMiddleware = (req: any, res: any, next: any) => {
    // 401 Unathorized 
    // 403 Forbidden

    const { accesstoken, checksum } = req.headers;

    if (accesstoken == undefined || checksum == undefined) {
        logger.error("no token");
        return res.status(401).send({ success: false, code: "NO_TOKEN", message: "no token" });

    }
    else {
        let checkToken: any = verifyKey(accesstoken.toString());
        const checkCheckSum = CryptoJS.SHA256(magicKey + accesstoken + magicKey).toString(CryptoJS.enc.Hex);
        
        if (checkToken.code == 200 && (checksum == checkCheckSum)) {
            next();
        }
        else {
            logger.error("token error");
            return res.status(403).send({ success: false, code: checkToken.code, message: checkToken.msg || "token error" });
        }
    }
}



// customer : seq, account, loginType
// admin    :  id, name   , role
export const makeAccessToken = (account: string, name: string, role: string) => {
    return jwt.sign({ account, name, role }, magicKey, { expiresIn })
}

export const getInfoJWT = (jtw: string) => {
    const { account, name, role }: any = jwt_decode(jtw);
    return { account: account, loginAccount: name, loginType: role };
}

export const makeRefreshToken = async (id: string) => {
    let refreshToken = bcrypt.hashSync(id, salt);
    return refreshToken;
}

