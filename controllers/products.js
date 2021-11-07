const Product = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({ name: "vase table" });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res, next) => {
  res.status(200).json({ msg: "Get all products" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
