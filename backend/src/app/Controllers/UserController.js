const { User } = require("../models");
const bcrypt = require("bcryptjs");
const db = require("../models");

class UserController {
  constructor(req, res) {}

  async store(req, res) {
    const { email, name, password } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res
        .status(200)
        .json({ status: "error", msg: "Email já cadastrado" });
    }

    try {
      const criarUsuario = await User.create({
        name: name,
        email: email,
        password: password
      });

      return res.send({
        status: "success",
        msg: "Usuário criado"
      });
    } catch (err) {
      return res.status(200).send({
        status: "error",
        msg: "Ocorreu um erro interno, por favor, tente novamente mais tarde"
      });
    }
  }

  async update(req, res) {
    const { old_password } = req.body;

    const user = await User.findByPk(req.userId);

    try {
      if (old_password && !(await user.checkPassword(old_password))) {
        return res
          .status(200)
          .json({ status: "error", msg: "Informe sua senha corretamente" });
      }

      const { id, name } = await user.update(req.body);
      return res.json({
        status: "success",
        msg: "Senha alterada com sucesso!",
        id,
        name
      });
    } catch (err) {
      return res.json({
        status: "error",
        msg: "Ocorreu um erro interno, por favor, tente novamente mais tarde"
      });
    }
  }
}

module.exports = new UserController();
