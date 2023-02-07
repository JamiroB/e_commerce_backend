const models = require("../models/index");
const { Op } = require("sequelize");

const { product, users } = models;

class ProductServices {
  static async create(products, loginInfo) {
    try {
      const { id: loginId } = loginInfo;
      const result = await product.create({
        name: products.name,
        price: products.price,
        availableQty: products.availableQty,
        status: products.status,
        image: products.image,
        userId: loginId,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const result = await product.findAll({
        where: {
          availableQty: {
            [Op.gt]: 0,
          },
        },
        include: {
          model: users,
          as: "user",
          attributes: ["username"],
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductServices;
