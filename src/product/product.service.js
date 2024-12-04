// Service layer bertujuan untuk handle bisnis logic

const prisma = require("../db");
const {
  findProducts,
  findProductById,
  insertProduct,
  editProduct,
  deleteProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  if (typeof id != "number") {
    throw Error("Id is not a number!");
  }

  const product = await findProductById(id);
  console.log(product);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (ProductData) => {
  const product = await insertProduct(ProductData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

const updateProduct = async (id, newProductData) => {
  await getProductById(id);
  await editProduct(id, newProductData);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProduct,
};
