import crypto from 'crypto';
import logger from "../config/logger";
import pool from "../config/database";

export default class DB {

    static key() {
        try {
            return Date.now().toString(16) + crypto.randomBytes(4).toString('hex');
        }
        catch (err) {
            console.log(err);
            throw(err);
        }
    }

    static async conn(db: any) {
        try {
            return await pool[db].getConnection();
        }
        catch (err) {
            console.log({ error: db });
            logger.error(err);
            return null
        }
    }

    /**
     * 
     * @param db 
     * @param query 1개의 row를 기대한다. 
     * 값이 존재하지 않는 경우 null return
     */
    static async select(db: any, sql: string, values?: any) {
        try {
            let conn, row;
            conn = await pool[db].getConnection();
            row = await conn.query(sql, values);
            conn.release();

            return row[0][0] === undefined ? null : row[0][0];
        }
        catch (err) {
            console.log(err);
            throw(err);
        }
    }

    /**
     * 
     * @param db 
     * @param query  여러개의 rows를 기대한다. 
     */
    static async list(db: any, sql: string, values?: any) {
        try {
            let conn, rows;

            conn = await pool[db].getConnection();
            rows = await conn.query(sql, values);

            conn.release();
            return rows[0];
        }
        catch (err) {
            console.log(err);
            throw(err);
        }        
    }

    /**
     * 
     * @param db 
     * @param query  여러개의 rows를 기대한다. 
     */
    static async listCountSP(db: any, sql: string, values?: any) {
        try { 
            let conn, rows

            conn = await pool[db].getConnection();
            rows = await conn.query(sql, values);
            conn.release();

            let data = {
                rows: rows[0][0],
                totalCount: rows[0][1][0].totalCount
            };

            return data;
        }
        catch (err) {
            console.log(err);
            throw(err);
        }
    }


    /**
     * 
     * @param db 
     * @param data 
     */
    static async execute(db: any, sql: string, values?: any) {
        try {
            let conn, row;
            
            conn = await pool[db].getConnection();
            
            row = await conn.query(sql, values);
            conn.release();

            return row[0];
        }
        catch (err) {
            console.log(err);
            throw(err);
        }
    }
}