const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  let bearerToken = req.headers.authorization;
  if (bearerToken) {
    const token = bearerToken.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, {algorithm: "HS512", expiresIn: "12h"});
      req.jwt_decoded = jwt.decode(token); 
      // Decodifico el token el cual tiene información de quien se logueo y lo mando por req con el nombre jwt_decoded
      // para así poder utilizar la info en productInCart
      next();
    } catch (error) {
      res.status(401).json({ message: "No token" });
    }
  } else {
    res.status(498).json({ message: "No token provided" });
  }
};

module.exports = authMiddleware;
