// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProduct: editProductById,
} = require("./product.service");

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);
    res.status(201).send({
      message: "New product has been added successfully",
      payload: product,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteProductById(id);
    res.status(200).send({
      message: "Product has been deleted successfully",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newProductData = req.body;
    if (
      !(
        newProductData.name &&
        newProductData.price &&
        newProductData.description &&
        newProductData.image
      )
    ) {
      throw Error("Payload tidak sesuai");
    }
    const product = await editProductById(id, newProductData);
    res.status(201).send({
      message: "a product has been updated successfully",
      payload: product,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newProductData = req.body;
    const product = await editProductById(id, newProductData);
    res.status(201).send({
      message: "a product has been updated successfully",
      payload: product,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router;
