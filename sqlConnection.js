const mysql = require("mysql");
require("dotenv").config();

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
