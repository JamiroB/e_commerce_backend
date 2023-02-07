const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return productInCart.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     addProductInCart:
 *       type: object
 *       properties:
 *         productId:
 *           type: int
 *           example: 4
 *         quantity:
 *           type: int
 *           example: 1
 *         price:
 *           type: int
 *           example: 120
 *         status:
 *           type: string
 *           example: true
 *     productInCartResponse:
 *       type: object
 *       properties:
 *         cartId:
 *           type: int
 *           example: 2
 *         productId:
 *           type: int
 *           example: 4
 *         quantity:
 *           type: int
 *           example: 1
 *         price:
 *           type: int
 *           example: 120
 *         status:
 *           type: string
 *           example: true
 */

class productInCart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cart',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productInCart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "productInCart_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
