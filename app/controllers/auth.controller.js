const db = require("../models");
const config = require("../config/auth.config");
const Usuario = db.usuario;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*exports.signup = async (req, res) => {
  // Save Usuario to Database
  try {
    const usuario = await Usuario.create({
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      celular: req.body.celular,
      entidad: req.body.entidad,
      cargo: req.body.cargo,
      correo: req.body.correo,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = usuario.setRoles(roles);
      if (result) res.send({ message: "Usuario registered successfully!" });
    } else {
      // usuario has role = 1
      const result = usuario.setRoles([1]);
      if (result) res.send({ message: "Usuario registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};*/

exports.signin = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        correo: req.body.correo,
      },
    });

    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      usuario.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Contraseña inválida!",
      });
    }

    const token = jwt.sign({ id: usuario.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    // let authorities = [];
    // const roles = await usuario.getRoles();
    // for (let i = 0; i < roles.length; i++) {
    //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
    // }

    req.session.token = token;

    return res.status(200).send({
      id: usuario.id,
      correo: usuario.correo,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      // roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "Terminaste la sesión!"
    });
  } catch (err) {
    this.next(err);
  }
};
