import Sequelize from "sequelize";
import dotenv from "dotenv";
import { promisify } from "util";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import generator from "generate-password";

import { successMessage, errorMessage } from "../utils/handleResponse";

import { TIPO_USUARIO, TIPO_PESSOA } from "../utils/enums";
import { Pessoa } from "../models";
import { setPassword } from "../utils";

dotenv.config();
const Op = Sequelize.Op;

export const generateToken = async (user) => {
  const token = await promisify(jwt.sign)(
    {
      id: user.id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  const refresh = await promisify(jwt.sign)(
    {
      id: user.id,
    },
    process.env.REFRESH_SECRET_KEY + user.password,
    {
      expiresIn: "7d",
    }
  );

  return [token, refresh];
};

// ok
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json(errorMessage(400, "Email e Senha obrigatórios"));
    }

    let user = await Pessoa.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { email },
              { usuario_perfil_id: TIPO_USUARIO.integrador },
            ],
          },
          { [Op.and]: [{ email }, { usuario_perfil_id: TIPO_USUARIO.admin }] },
        ],
      },
      attributes: { include: ["password"] },
      include: [{ model: req.db.UsuarioPerfil, as: "usuario_perfil" }],
    });

    if (!user) {
      return res.json(errorMessage(404, "Usuário não encontrado"));
    }

    if (!(await user.checkPassword(password))) {
      return res.json(errorMessage(400, "Senha incorreta"));
    }

    const [token, refresh] = await generateToken(user);

    user.password = undefined;

    res.set("Access-Control-Expose-Headers", "X-Acess-Token, X-Refresh-Token");
    res.set("X-Acess-Token", `Bearer ${token}`);
    res.set("X-Refresh-Token", `Bearer ${refresh}`);

    return res.json(successMessage(user));
  } catch (e) {
    return res.json(errorMessage(500, e));
  }
};

// ok
export const recover = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json(errorMessage(400, "E-mail obrigatório"));
    }

    const user = await Pessoa.findOne({
      where: { email },
      attributes: { include: ["password"] },
      include: [{ model: req.db.UsuarioPerfil, as: "usuario_perfil" }],
      include: [{ model: req.db.Endereco, as: "endereco" }],
    });

    if (!user) {
      return res.json(errorMessage(404, "Usuário não encontrado"));
    }

    const newPassword = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
    });

    const newPasswordWithBcrypt = await bcrypt.hash(newPassword, 10);

    // const response = await updatePassword(user.id, newPasswordWithBcrypt);

    user.password = newPasswordWithBcrypt;
    user.user_pass = null;

    console.log("-- newPasswordWithBcrypt : ", newPasswordWithBcrypt);
    const response = await user.save();
    if (!response) throw "Error ao atualizar senha do usuário";

    return res.json(
      successMessage(`E-mail com uma nova senha foi enviado para ${email}`)
    );
  } catch (e) {
    return res.json(errorMessage(500, e));
  }
};

// ok
export const me = async (req, res) => {
  try {
    let findPessoa = await Pessoa.findOne({
      where: { id: req.currentUser.id },
      include: [
        {
          model: req.db.Endereco,
          as: "endereco",
          include: [{ model: req.db.Estados }],
        },
      ],
    });

    if (!findPessoa) {
      return res.json(errorMessage(404, "Usuário não encontrado"));
    }

    // const [token, refresh] = await generateToken(findPessoa);

    // res.set("x-acess-token", token);
    // res.set("x-refresh-token", refresh);

    return res.json(successMessage(findPessoa));
  } catch (err) {
    return res.json(errorMessage(500, err));
  }
};

export const contact = async (req, res) => {
  try {
    const { name, email, telefone, cidade, uf, subject, message } = req.body;

    if (!name) return res.json(errorMessage(400, "Nome obrigatório"));
    if (!email) return res.json(errorMessage(400, "E-mail obrigatório"));
    if (!telefone) return res.json(errorMessage(400, "Telefone obrigatório"));
    if (!cidade) return res.json(errorMessage(400, "Cidade obrigatório"));
    if (!uf) return res.json(errorMessage(400, "Estado obrigatório"));
    if (!subject) return res.json(errorMessage(400, "Assunto obrigatório"));
    if (!message) return res.json(errorMessage(400, "Mensagem obrigatória"));

    return res.json(successMessage(`E-mail enviado com sucesso.`));
  } catch (message) {
    return res.json(errorMessage(500, message));
  }
};
