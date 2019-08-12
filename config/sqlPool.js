import mysql from 'mysql2/promise';
import { node, pass, dataBase } from './privateData';


const pool = mysql.createPool({
  host: 'library.cztg0znbzlfj.ap-south-1.rds.amazonaws.com',
  user: node,
  password: pass,
  database: dataBase,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
console.log(`Using database = ${dataBase} `);
module.exports = pool;
