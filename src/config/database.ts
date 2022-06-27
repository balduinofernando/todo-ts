import { createPool } from "mysql2";

const database = createPool({
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export { database };
