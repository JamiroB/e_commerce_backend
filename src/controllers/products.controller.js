const ProductServices = require("../services/products.services");

const createProduct = async (req, res) => {
  try {
    const loginInfo = req.jwt_decoded;
    const newProduct = req.body;
    const result = await ProductServices.create(newProduct, loginInfo);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await ProductServices.getAll();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createProduct, getAllProducts };
