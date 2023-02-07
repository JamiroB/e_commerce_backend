const models = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { users, cart } = models;

class AuthServices {
  static async register(user) {
    try {
      const result = await users.create(user);
      const userCart = await users.findOne({
        where: {
          username: user.username,
        },
      });
      const resultProductInCart = await cart.create({
        userId: userCart.dataValues.id,
        totalPrice: 0,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async login(credentials) {
    try {
      const { email, password } = credentials;
      const user = await users.findOne({
        where: { email },
      });
      if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);
        const isValidEmail = email === user.email;
        return isValidPassword
          ? { isValidPassword, user, isValidEmail }
          : { isValidPassword };
      }
      return { isValidPassword: false }, { isValidEmail: false };
    } catch (error) {
      throw error;
    }
  }

  static genToken(data) {
    try {
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "10m",
        algorithm: "HS512",
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
