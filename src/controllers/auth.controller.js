const AuthServices = require("../services/auth.services");
const transporter = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      res.status(201).json({ message: "User created." });
      await transporter.sendMail({
        to: result.email,
        from: "jbances7@gmail.com",
        subject: "Email confirmation",
        html: "<h1>Bienvenido a la mejor app.</h1> <p>Tienes que confirmar tu email</p> <p>Solo haz click en el siguiente <a href='#' target='new_blanc'> enlace </a></p>"
      });
    } else {
      res.status(404).json({ message: "something wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not email provided.",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not password provided.",
      });
    }
    const result = await AuthServices.login({ email, password });
    if (result.isValidPassword) {
      const { username, id, email } = result.user;
      const userData = { id, username, email };
      const token = AuthServices.genToken(userData);
      userData.token = token;
      res.json(userData);
    } else {
      if (result.isValidEmail === false) {
        res.status(400).json("Email wrong");
      } else if (result.isValidPassword === false){
        res.status(400).json("Password wrong");
      } else if(result.isValidEmail === false && result.isValidPassword === false){
        res.status(400).json("All wrong");
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Something wrong" });
  }
};

module.exports = {
  register,
  login,
};
