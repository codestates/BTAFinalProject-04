import Config from '../config/config';
import logger from '../config/logger';
import del from 'del';

export default class Util {
    static Number(n: any, rtn: number = 0) {
        n = Number(n);
        if (isNaN(n)) {
            n = rtn;
        }
        return n;
    };

    static String(s: any) {

        var result: string;
        result = "";
        if (s != undefined) {
            result = s;
        }
        return result;
    };
}

export const delFileWithLog = async (filepath: string, errSource: string) => {
    try {
        await del(Config.fileupload.dirname + "/" + filepath);
    } catch (err: any) {
        err.source = errSource;
        logger.error(err);
    }
}

export const delFileWithError = async (filepath: string, err: any) => {
    try {
        await del(Config.fileupload.dirname + "/" + filepath);
    } catch (err2: any) {
        err.message += ", " + err2.message;
    }
} 