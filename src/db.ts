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

async function selectPacks() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM packs;");
  return rows;
}

async function selectProductByCode(code) {
  const conn = await connect();
  const query = "SELECT * FROM products WHERE code = ?";
  const [product] = await conn.query(query, [code]);
  return product;
}

async function changePriceProduct(code, new_price) {
  const conn = await connect();

  const packSql = "SELECT * FROM packs WHERE product_id=?";
  const [pack] = await conn.query(packSql, [code]);

  if (pack[0] !== undefined) {
    const query = "SELECT * FROM products WHERE code = ?";
    const [product] = await conn.query(query, [code]);

    const query2 = "SELECT * FROM products WHERE code = ?";
    const [packProduct] = await conn.query(query2, [pack[0].pack_id]);

    const sqlPackId = "SELECT * FROM packs WHERE pack_id=?";
    const [packFromId] = await conn.query(sqlPackId, [pack[0].pack_id]);

    if (packFromId.length > 0) {
      const sqlPricePack = "UPDATE products SET sales_price=? WHERE code=?";

      const packProductPrice = packProduct[0].sales_price;
      const productPrice = product[0].sales_price;
      const packQty = pack[0].qty;
      const newPrice = new_price;

      const multiOldPrice = productPrice * packQty;
      const multiNewPrice = newPrice * packQty;
      const halfPrice = packProductPrice - multiOldPrice;

      const totalPrice = halfPrice + multiNewPrice;
      await conn.query(sqlPricePack, [totalPrice, pack[0].pack_id]);

      const sql = "UPDATE products SET sales_price=? WHERE code=?";
      await conn.query(sql, [new_price, code]);
    } else {
      const sqlPricePack = "UPDATE products SET sales_price=? WHERE code=?";
      await conn.query(sqlPricePack, [new_price * pack.qty, pack[0].pack_id]);

      const sql = "UPDATE products SET sales_price=? WHERE code=?";
      await conn.query(sql, [new_price, code]);
    }
  } else {
    const sql = "UPDATE products SET sales_price=? WHERE code=?";
    await conn.query(sql, [new_price, code]);
  }
}

module.exports = {
  selectProducts,
  selectPacks,
  selectProductByCode,
  changePriceProduct,
};
