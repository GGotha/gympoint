const { User } = require("../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email }
      });

      if (!user || !(await user.checkPassword(password))) {
        return res
          .status(200)
          .json({ status: "error", msg: "Usuário ou senha inválida" });
      }

      return res.status(200).json({
        status: "success",
        msg: "Login efetuado com sucesso",
        token: user.generateToken(user)
      });
    } catch (error) {
      return res.status(200).json({
        status: "error",
        msg: "Erro ao autenticar, tente novamente mais tarde"
      });
    }
  }
}

module.exports = new SessionController();
