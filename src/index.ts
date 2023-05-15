import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const db = require("./db");
    const produtos = await db.selectProducts();
    res.status(200).send({ produtos: produtos, message: "Lista de Produtos" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/packs", async (req: Request, res: Response) => {
  try {
    const db = require("./db");
    const packs = await db.selectPacks();
    res.status(200).send({ packs: packs, message: "Lista de Pacotes" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.put("/products", async (req: Request, res: Response) => {
  try {
    const code = req.body.code as number;
    const new_price = req.body.new_price as number;

    if (typeof code !== "number") {
      throw new Error("O código não é numérico.");
    }

    if (typeof new_price !== "number") {
      throw new Error("O preço não é numérico.");
    }

    const db = require("./db");

    const selectProduct = await db.selectProductByCode(code);

    if (selectProduct.length < 1)
      throw new Error(
        "Nenhum produto encontrado com esse código. Insira um Código válido."
      );

    await db.changePriceProduct(code, new_price);

    res.status(200).send({ message: "Preço Modificado" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
