const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const routerApi = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

db.authenticate()
  .then(() => console.log("Base de datos autenticado."))
  .catch((error) => console.error(error));

db.sync({ force: false })
  .then(() => console.log("Base de datos sincronizada."))
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my server" });
});

routerApi(app);


module.exports = app;
