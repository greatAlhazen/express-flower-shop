const Product = require("../models/product");

///custom get product middleware
const getProduct = async (req, res, next) => {
  let products;
  const category = req.query.category;
  const sort = req.query.sort;

  //send product with category
  try {
    if (category) {
      if (category === "all") {
        products = await Product.find();
      } else {
        products = await Product.find({ category: { $eq: category } });
      }
    } else if (sort) {
      //send product with sort
      if (sort === "new") {
        products = await Product.find().sort({ createdAt: -1 });
      } else {
        products = await Product.find().sort({ createdAt: 1 });
      }
    } else {
      products = await Product.find();
    }
  } catch (err) {
    products = "Products are not found";
  }

  //send product without anything
  req.product = products;
  next();
};

module.exports = getProduct;
