import 'dotenv/config';
import { Client } from 'pg';
import { consoleColor } from '../utils';

const prodEnv = {
  host: process.env.PROD_DATABASE_HOST,
  database: process.env.PROD_DATABASE,
  user: process.env.PROD_DATABASE_USER,
  password: process.env.PROD_DATABASE_PASSWORD,
  port:process.env.DATABASE_PORT
}
const devEnv = {
  host: process.env.DEV_DATABASE_HOST,
  database: process.env.DEV_DATABASE,
  user: process.env.DEV_DATABASE_USER,
  password: process.env.DEV_DATABASE_PASSWORD,
  port:process.env.DATABASE_PORT
}

const connection = new Client(process.env.NODE_ENV === 'production' ? prodEnv : devEnv);

connection.connect(err => {
  if (err) {
    console.error(consoleColor, `Connection Error: ${err.stack}`);
  } else {
    console.log(
      consoleColor,
      `Connected to PostgreSQL on port ${process.env.DATABASE_PORT}`,
    );
  }
});

export { connection };
