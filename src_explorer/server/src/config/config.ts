import path from 'path';
import dotenv from 'dotenv';

let dbHost;
let dbPassword;

if (!process.env.NODE_ENV || (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "production")) {
    console.log("MODE:", process.env.NODE_ENV)
    throw new Error("Unknown NODE_ENV")
}
else {
    dotenv.config({
        path: path.join(__dirname, "..", `${process.env.NODE_ENV}.env`)
    });
    if(process.env.NODE_ENV === "development") {
        dbHost = process.env.SERVER_DB_HOST_TEST;
        dbPassword = process.env.SERVER_DB_PASSWORD_TEST;
    }
    else if(process.env.NODE_ENV === "production") {
        dbHost = process.env.SERVER_DB_HOST_LIVE;
        dbPassword = process.env.SERVER_DB_PASSWORD_LIVE;
    }
    else {
        throw new Error("Invalid Mode");
    }
}

export const Config = {
    title: "BTA03_DAPP_PROJECT",
    server: {
        "host": "localhost",
        "port": 3200,
        "mode": "development",
        "mode_description": "development/test/production",
        "swagger": "on",
        "magickey": process.env.SERVER_MAGICKEY,
        "expire": 31536000,
        "expire_description": "31536000 = 60*60*24*365, 3600 = 60*60"
    },
    fileupload: {
        "dirname": "uploadFiles",
        "maxsize": "104857600",
        "description": "maxsize 10M = 10*1024*1024 = 104857600"
    },
    logger: {
        "level": "info",
        "dirname": "log",
        "filename": "combined.log",
        "errorfile": "error.log"
    },
    db: [
        {
            "host": dbHost,
            "port": Number(process.env.SERVER_DB_PORT) || 3306,
            "user": process.env.SERVER_DB_USER,
            "password": dbPassword,
            "database": process.env.SERVER_DB_DATABASE,
            "name": process.env.SERVER_DB_NAME as string,
            "connectionLimit": 10
        }
    ]
}

export default Config;