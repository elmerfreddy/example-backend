const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "acopiador-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const bcrypt = require("bcryptjs");
const db = require("./app/models");
const Usuario = db.usuario;

db.sequelize.sync({force: true})
  .then(() => {
    console.log("Base de datos sincronizada.");
    inicial();
  })
  .catch((err) => {
    console.log("Falla al sincronizar la base de datos: " + err.message);
  });

function inicial() {
  Usuario.create({
    nombres: "José Pepito",
    apellidos: "Palotes",
    celular: "70372634",
    entidad: "Entidad 1",
    cargo: "Técnico 1",
    correo: "pepito@gmail.com",
    password: bcrypt.hashSync("demo1234", 8),
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación acopiador." });
});

// routes
require('./app/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
