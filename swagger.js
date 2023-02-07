const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: [
    "./src/routes/auth.routes.js",
    "./src/models/users.js",
    "./src/routes/products.routes.js",
    "./src/models/product.js",
    "./src/routes/productInCart.routes.js",
    "./src/models/productInCart.js",
    "./src/routes/order.routes.js",
  ],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E_commerce en node js",
      version: "0.0.9",
      description: "API para aplicación de e_commerce by Jamir Bances",
    },
  },
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/v1/docs.json", (req, res) => {
    res.setHeader({ "Content-Type": "application/json" });
    res.send(swaggerSpec);
  });

  console.log(
    `La documentación está disponible en ${process.env.URL}:${port}/api/v1/docs`
  );
};

module.exports = swaggerDocs;
