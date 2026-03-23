import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const isCloudSqlSocket = process.env.DATABASE_URL && process.env.DATABASE_URL.includes("/cloudsql/");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isCloudSqlSocket ? false : {
    rejectUnauthorized: false,
  },
});

export default pool;
