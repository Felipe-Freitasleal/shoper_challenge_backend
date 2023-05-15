//@ts-nocheck
import dotenv from "dotenv";

dotenv.config();

async function connect() {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: `${process.env.MYSQL_KEY}`,
    database: "productsdb",
  });
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function selectProducts() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM products;");
  return rows;
}

module.exports = { selectProducts };
