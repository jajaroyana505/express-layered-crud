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
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.post("/products", async (req, res) => {
  // mengambil data payload yang dikirim oleh client
  const newProductData = req.body;
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });

  res.status(201).send({
    message: "New product has been added successfully",
    payload: product,
  });
});

app.listen(port, () => {
  console.log(
    "Express API running in port:" + port + ", http://localhost:" + port
  );
});
