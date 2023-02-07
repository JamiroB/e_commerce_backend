const { productInCart, cart, order, productInOrder } = require("../models");
/* const models = require("../models");

const { productInCart, cart} = models; */

class ProductInCartServices {
  static async create(newProductInCart, loginInfo) {
    try {
      const { id: loginId } = loginInfo; // traído del auth.middleware
      const { productId, quantity, price, status } = newProductInCart;
      const searchingOwnerCart = await cart.findOne({
        where: {
          userId: loginId,
        },
      });

      const cartIdFoundIt = searchingOwnerCart.dataValues.id;

      const result = await productInCart.create({
        cartId: cartIdFoundIt,
        productId,
        quantity,
        price,
        status,
      });

      const productInCartData = await productInCart.findAll({
        where: {
          cartId: cartIdFoundIt,
        },
      });
      const totalPrice = productInCartData
        .map((i) => i.dataValues.price)
        .reduce((prev, curr) => prev + curr, 0); //suma de todos los precios del carrito

      const field = { loginId, totalPrice };
      await cart.update(field, { where: { id: cartIdFoundIt } });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(loginInfo) {
    try {
      const { id: loginId } = loginInfo;
      const searchingOwnerCart = await cart.findOne({
        where: {
          userId: loginId,
        },
      });
      const cartIdFoundIt = searchingOwnerCart.dataValues.id;

      const result = await productInCart.findAll({
        where: {
          cartId: cartIdFoundIt,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async purchased(loginInfo) {
    try {
      const { id: loginId } = loginInfo;
      const searchingOwnerCart = await cart.findOne({
        where: {
          userId: loginId,
        },
      });
      const cartIdFoundIt = searchingOwnerCart.dataValues.id;

      const result = await productInCart.update(
        { status: true },
        {
          where: {
            cartId: cartIdFoundIt,
          },
        }
      );

      const productInCartData = await productInCart.findAll({
        where: {
          cartId: cartIdFoundIt,
        },
      });
      const totalPrice = productInCartData
        .map((i) => i.dataValues.price)
        .reduce((prev, curr) => prev + curr, 0); //suma de todos los precios del carrito

      await order.create({
        totalPrice: totalPrice,
        userId: loginId,
        status: true,
      });

      /* const orderData = await order.findOne({
        where: {
          userId: loginId,
        },
      });

      const productInCartToOrder = productInCartData.map((i) => {
        return { 
          productId: i.dataValues.productId,
          quantity: i.dataValues.quantity,
          price: i.dataValues.price,
          status: i.dataValues.status,
        };
      });

      const productId = (productInCartToOrder.map(i => {
        return i.productId
      }));
      
      const quantity = (productInCartToOrder.map(i => {
        return i.quantity
      }));

      const price = (productInCartToOrder.map(i => {
        return i.price
      }));
      
      const status = (productInCartToOrder.map(i => {
        return i.status
      }));

      await productInOrder.bulkCreate([
        {orderId: orderData.dataValues.id},
        {productId: productId},
        {quantity: quantity},
        {price: price},
        {status: status},
      ]); */
      
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductInCartServices;
