const models = require("../models");

const { order } = models;

class OrderServices {
  static async getAll(loginInfo){
    try {
      const { id: loginId } = loginInfo;
      const result = await order.findAll({
        where: {
          userId: loginId
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderServices;