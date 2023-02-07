const OrderServices = require("../services/order.services");

const getAllOrders = async (req, res) => {
  try {
    const loginInfo = req.jwt_decoded;
    const result = await OrderServices.getAll(loginInfo);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllOrders };
