"use strict";
exports.__esModule = true;
exports.database = void 0;
var mysql2_1 = require("mysql2");
var database = mysql2_1.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "fernando",
    database: "todo_ts"
});
exports.database = database;
