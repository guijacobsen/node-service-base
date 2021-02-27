import Sequelize from "sequelize";
import { successMessage, errorMessage } from "../utils/handleResponse";
import { STATUS_USUARIO, TIPO_USUARIO } from "../utils/enums";
import { createSubAccount, bindUser } from "../services/ApiCamera";

import { Pessoa } from "../models";

const Op = Sequelize.Op;

export const getByEmail = async (req, res) => {
  const transaction = await req.db.sequelize.transaction();
  try {
    const { email } = req.params;

    const user = await req.db.Pessoa.findOne({
      where: { [Op.and]: [{ email }] },
      include: [{ model: req.db.UsuarioPerfil, as: "usuario_perfil" }],
      transaction,
    });

    await transaction.commit();

    return res.json(successMessage(user));
  } catch (e) {
    await transaction.rollback();

    return res.json(
      errorMessage(
        500,
        e.errors && e.errors[0].message
          ? e.errors[0].message
          : "Erro ao buscar usuário"
      )
    );
  }
};

export const getAll = async (req, res) => {
  const transaction = await req.db.sequelize.transaction();
  try {
    const user = await req.db.Pessoa.findAll({
      include: [{ model: req.db.UsuarioPerfil, as: "usuario_perfil" }],
      transaction,
    });

    await transaction.commit();

    return res.json(successMessage(user));
  } catch (e) {
    await transaction.rollback();

    return res.json(
      errorMessage(
        500,
        e.errors && e.errors[0].message
          ? e.errors[0].message
          : "Erro ao buscar usuário"
      )
    );
  }
};

export const addUser = async (req, res) => {
  const transaction = await req.db.sequelize.transaction();
  try {
    const { name, email, password } = req.body;

    let pessoa = await Pessoa.findOne({ where: [{ email }] });
    if (pessoa) throw { errors: [{ message: "Usuário já cadastrado." }] };

    pessoa = await Pessoa.create(
      {
        name,
        email,
        password,
        status: STATUS_USUARIO.ativo,
        usuario_perfil_id: TIPO_USUARIO.cliente,
      },
      { transaction }
    );
    if (!pessoa) throw { errors: [{ message: "Erro ao cadastrar cliente" }] };

    await transaction.commit();

    return res.json(successMessage(pessoa));
  } catch (e) {
    console.warn("addUser error: ", e);
    await transaction.rollback();

    return res.json(
      errorMessage(
        500,
        e.errors && e.errors[0].message
          ? e.errors[0].message
          : "Erro ao cadastrar usuário"
      )
    );
  }
};

// ok
// export const updatePassword = async (id, newPassword) => {
//   try {
//     let user = await Pessoa.findOne({ where: { id } });
//     if (!user || !newPassword) {
//       return false;
//     }
//     user.password = newPassword;
//     return await user.save();
//   } catch (error) {
//     throw new Error("Falha ao alterar senha de usuário");
//   }
// };
