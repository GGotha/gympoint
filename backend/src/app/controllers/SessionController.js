const { Users } = require("../models");
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
      return res
        .status(400)
        .json({ status: "error", msg: "Erro na validação" });
    }

    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email }
    });

    try {
      if (user === null || !(await user.checkPassword(password))) {
        return res.status(422).json({
          status: "error",
          msg: "Usuário ou senha inválidos"
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
}

module.exports = new SessionController();
