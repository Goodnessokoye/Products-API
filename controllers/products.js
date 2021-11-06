const getAllProducts = async (req, res, next) => {
  res.status(200).json({ msg: "Get all products" });
};

const getAllProductsStatic = async (req, res, next) => {
  res.status(200).json({ msg: `Get all product static` });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
