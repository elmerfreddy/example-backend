module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuarios", {
    nombres: {
      type: Sequelize.STRING
    },
    apellidos: {
      type: Sequelize.STRING
    },
    correo: {
      type: Sequelize.STRING
    },
    celular: {
      type: Sequelize.STRING
    },
    entidad: {
      type: Sequelize.STRING
    },
    cargo: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return Usuario;
};
