const db = require("../models");
const Usuario = db.usuario;

verificarDuplicidadDeCorreo = async (req, res, next) => {
  try {
    let usuario = await Usuario.findOne({
      where: {
        correo: req.body.correo
      }
    });

    if (usuario) {
      return res.status(400).send({
        message: "Error! El correo electrónico ya está en uso!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "No se puede validar el Correo Electrónico!"
    });
  }
};

const verifySignUp = {
  verificarDuplicidadDeCorreo,
};

module.exports = verifySignUp;
