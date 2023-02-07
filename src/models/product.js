const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return product.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: jamir
 *         price:
 *           type: int
 *           example: 150
 *         availableQty:
 *           type: int
 *           example: 2
 *         status:
 *           type: boolean
 *           example: true
 *         image:
 *           type: string
 *           example:
 *     productResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: jamir
 *         price:
 *           type: int
 *           example: 150
 *         availableQty:
 *           type: int
 *           example: 2
 *         status:
 *           type: boolean
 *           example: true
 *         image:
 *           type: string
 *           example:
 *         userId:
 *           type: int
 *           example: 1
 */

class product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    availableQty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
