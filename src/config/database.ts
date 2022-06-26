import { createPool } from "mysql2";

const database = createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "fernando",
  database: "todo_ts",
});

export { database };
