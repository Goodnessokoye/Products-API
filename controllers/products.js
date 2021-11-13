const Product = require("../models/product");
// const { search } = require("../routes/products");

const getAllProductsStatic = async (req, res, next) => {
  const search = "ab";

  const products = await Product.find({ price: { $gt: 30 } })
    .select("name price ")
    .sort("price");
  // .limit(50);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res, next) => {
  const search = "r";
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      //in here we'll map the user friendly ones to the ones that are understood by the mongoose
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    //converting our values to the one understood by mongoose
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
   
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObject);
  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort();
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  } else {
    result = result.select();
  }

  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skip = (page - 1) * limit;
  result.skip(skip).limit(limit);
  //23
  //4 7 7 7 2

  const products = await result;
  res.status(200).json({ products, nbHits: products.length, msg: "Hello" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
