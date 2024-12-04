const express = require("express");
const dotenv = require("dotenv");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

dotenv.config();
const app = express();
const port = process.env.PORT;

// menggunakan muddleware bawaan express agar request dari client dapat di baca
// atau dalam kata lain diubah menjadu json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello word");
});

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(port, () => {
  console.log(
    "Express API running in port:" + port + ", http://localhost:" + port
  );
});
