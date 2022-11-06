import Config from './config';
import mysql from 'mysql2/promise';

const pool: any = {};

(async() => {
    try {
        for (let db of Config.db) {

            console.log("db.name:", db.name);
            
            let conn, rows;
            pool[db.name] = mysql.createPool({ host: db.host, port: db.port, user: db.user, password: db.password, database: db.database, connectionLimit : db.connectionLimit})                
            conn = await pool[db.name].getConnection();
            rows = await conn.query('SELECT VERSION() As version');
            console.log(`Mysql Connected : version = ${rows[0][0].version}`)                    
            conn.release();
        }
    } catch(e) {
        console.log(e);
        process.exit(1);
    }       
})();

export default pool;