const DataTypes = require("sequelize").DataTypes;
const _cart = require("./cart");
const _order = require("./order");
const _product = require("./product");
const _productInCart = require("./productInCart");
const _productInOrder = require("./productInOrder");
const _users = require("./users");

function initModels(sequelize) {
  const cart = _cart(sequelize, DataTypes);
  const order = _order(sequelize, DataTypes);
  const product = _product(sequelize, DataTypes);
  const productInCart = _productInCart(sequelize, DataTypes);
  const productInOrder = _productInOrder(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  productInCart.belongsTo(cart, { as: "cart", foreignKey: "cartId"});
  cart.hasMany(productInCart, { as: "productInCarts", foreignKey: "cartId"});
  productInOrder.belongsTo(order, { as: "order", foreignKey: "orderId"});
  order.hasMany(productInOrder, { as: "productInOrders", foreignKey: "orderId"});
  productInCart.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(productInCart, { as: "productInCarts", foreignKey: "productId"});
  productInOrder.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(productInOrder, { as: "productInOrders", foreignKey: "productId"});
  cart.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(cart, { as: "carts", foreignKey: "userId"});
  order.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(order, { as: "orders", foreignKey: "userId"});
  product.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(product, { as: "products", foreignKey: "userId"});

  return {
    cart,
    order,
    product,
    productInCart,
    productInOrder,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
