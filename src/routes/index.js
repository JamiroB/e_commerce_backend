const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const authMiddleware = require("../middlewares/auth.middlewares");
const productInCart = require("./productInCart.routes");
const order = require("./order.routes");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", authMiddleware, productsRoutes);
  app.use("/api/v1/productsincart", authMiddleware, productInCart);
  app.use("/api/v1/order", authMiddleware, order);
}

module.exports = routerApi;