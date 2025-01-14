import mysql from 'mysql2';
import 'dotenv/config';
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export class Database {
  connection = null;



  constructor() {
    this.connection = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  stop() {
    this.connection.end();
  }
}
