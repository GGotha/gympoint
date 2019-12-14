const { Users } = require("../models");

class SessionController {
  async store(req, res) {
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