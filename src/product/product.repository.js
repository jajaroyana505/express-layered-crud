// Layer repository berfungsi untuk berkomunikasi dengan database

const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const insertProduct = async (ProductData) => {
  const product = await prisma.product.create({
    data: {
      name: ProductData.name,
      price: ProductData.price,
      description: ProductData.description,
      image: ProductData.image,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const editProduct = async (id, ProductData) => {
  await prisma.product.update({
    where: {
      id,
    },
    data: ProductData,
  });
};

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  editProduct,
};
