module.exports = (sequelize, Sequelize) => {
  const UsuarioPerfil = sequelize.define("UsuarioPerfil", {
    perfil: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Perfil já cadastrado"
      },
      validate: {
        notNull: { msg: "Perfil obrigatório" },
        notEmpty: { msg: "Perfil inválido" }
      }
    }
  });

  return UsuarioPerfil;
};
