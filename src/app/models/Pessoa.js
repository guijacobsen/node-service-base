import { checkCPF } from "../utils/validation";
import bcrypt from "bcryptjs";
import { setPassword } from "../utils";

module.exports = (sequelize, Sequelize) => {
  const Pessoa = sequelize.define(
    "Pessoa",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name obrigatório" },
          notEmpty: { msg: "name inválido" },
        },
      },
      email: {
        type: Sequelize.CITEXT,
        allowNull: false,
        unique: {
          args: true,
          msg: "E-mail já cadastrado",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "E-mail inválido",
          },
          notNull: { msg: "E-mail obrigatório" },
          notEmpty: { msg: "E-mail inválido" },
        },
      },
      usuario_perfil_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          async custom(value) {
            const usuarioPerfil = await sequelize.models.UsuarioPerfil.findByPk(
              value
            );
            if (!usuarioPerfil) throw `{{usuario_perfil_id}} inválido`;
          },
        },
      },

      password: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
    },
    {
      underscored: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    }
  );

  Pessoa.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  Pessoa.associate = function (db) {
    Pessoa.belongsTo(db.UsuarioPerfil, {
      foreignKey: "usuario_perfil_id",
      targetKey: "id",
      as: "usuario_perfil",
    });
  };

  return Pessoa;
};
