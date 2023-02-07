//Importamos nodemailer
const nodemailer = require("nodemailer");
//contraseña de aplicación
require("dotenv").config();

//Creamos nuestro transportador

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "465",
  secure: true,
  auth: {
    user: "jbances7@gmail.com",
    pass: process.env.G_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

module.exports = transporter;
