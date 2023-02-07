const ProductInCartServices = require("../services/productInCart.services");
const transporter = require("../utils/mailer");

const createProductInCart = async (req, res) => {
  try {
    const loginInfo = req.jwt_decoded;
    const newProductInCart = req.body;
    const result = await ProductInCartServices.create(
      newProductInCart,
      loginInfo
    );
    res.status(201).json({message: "Product in cart added"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProductsInCart = async (req, res) => {
  try {
    const loginInfo = req.jwt_decoded;
    const result = await ProductInCartServices.getAll(loginInfo);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const purchasedProductInCart = async (req, res) => {
  try {
    const loginInfo = req.jwt_decoded;
    const result = await ProductInCartServices.purchased(loginInfo);
    if (result) {
      res.status(201).json({ message: "Successfuly purchased" });
      await transporter.sendMail({
        to: loginInfo.email,
        from: "jbances7@gmail.com",
        subject: "Purchased confirmation",
        html: "<h1>This is a message of confirm your purchased.</h1>"
      });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProductInCart,
  getAllProductsInCart,
  purchasedProductInCart,
};
