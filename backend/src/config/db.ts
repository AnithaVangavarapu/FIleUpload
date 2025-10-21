import dotenv from "dotenv";
import { Pool } from "pg";

//Load all variables from .env file into process.env
dotenv.config();

//DB connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD!,
});

export default pool;
