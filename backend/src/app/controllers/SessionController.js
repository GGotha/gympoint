const { Users, Students } = require("../models");
const Yup = require("yup");

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email }
    });

    try {
      if (!user || !(await user.checkPassword(password))) {
        return res.status(422).json({
          status: "error",
          msg: "Usuário ou senha inválido"
        });
      }

      const { name } = user;

      return res.status(200).json({
        user: {
          name,
          email
        },
        status: "success",
        msg: "Login efetuado com sucesso",
        token: user.generateToken(user)
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
  async mobileAuthenticate(req, res) {
    const { id } = req.params;

    try {
      const student = await Students.findOne({
        where: { id },
        attributes: ["id", "name", "email", "age", "weight", "height"]
      });

      if (!student) {
        return res.send({
          status: "error",
          msg: "Não foi possível encontrar seu cadastro!"
        });
      }

      return res.send({
        status: "success",
        msg: "Login realizado com sucesso!",
        student
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
}

module.exports = new SessionController();
