"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (global.connection && global.connection.state !== "disconnected")
            return global.connection;
        const mysql = require("mysql2/promise");
        const connection = yield mysql.createConnection({
            host: "localhost",
            user: "root",
            password: `${process.env.MYSQL_KEY}`,
            database: "productsdb",
        });
        console.log("Conectou no MySQL!");
        global.connection = connection;
        return connection;
    });
}
function selectProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield connect();
        const [rows] = yield conn.query("SELECT * FROM products;");
        return rows;
    });
}
function selectPacks() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield connect();
        const [rows] = yield conn.query("SELECT * FROM packs;");
        return rows;
    });
}
function selectProductByCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield connect();
        const query = "SELECT * FROM products WHERE code = ?";
        const [product] = yield conn.query(query, [code]);
        return product;
    });
}
function changePriceProduct(code, new_price) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield connect();
        const packSql = "SELECT * FROM packs WHERE product_id=?";
        const [pack] = yield conn.query(packSql, [code]);
        if (pack[0] !== undefined) {
            const query = "SELECT * FROM products WHERE code = ?";
            const [product] = yield conn.query(query, [code]);
            const query2 = "SELECT * FROM products WHERE code = ?";
            const [packProduct] = yield conn.query(query2, [pack[0].pack_id]);
            const sqlPackId = "SELECT * FROM packs WHERE pack_id=?";
            const [packFromId] = yield conn.query(sqlPackId, [pack[0].pack_id]);
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
                yield conn.query(sqlPricePack, [totalPrice, pack[0].pack_id]);
                const sql = "UPDATE products SET sales_price=? WHERE code=?";
                yield conn.query(sql, [new_price, code]);
            }
            else {
                const sqlPricePack = "UPDATE products SET sales_price=? WHERE code=?";
                yield conn.query(sqlPricePack, [new_price * pack.qty, pack[0].pack_id]);
                const sql = "UPDATE products SET sales_price=? WHERE code=?";
                yield conn.query(sql, [new_price, code]);
            }
        }
        else {
            const sql = "UPDATE products SET sales_price=? WHERE code=?";
            yield conn.query(sql, [new_price, code]);
        }
    });
}
module.exports = {
    selectProducts,
    selectPacks,
    selectProductByCode,
    changePriceProduct,
};
//# sourceMappingURL=db.js.map