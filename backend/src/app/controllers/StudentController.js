const { Student } = require("../models");
const { User } = require("../models");

class StudentController {
  async store(req, res) {
    const {
      nome: name,
      email,
      idade: age,
      peso: weight,
      altura: height
    } = req.body;

    try {
      if (
        (await User.findOne({
          where: { email }
        })) ||
        (await Student.findOne({
          where: { email }
        }))
      ) {
        return res
          .status(422)
          .json({ status: "error", msg: "Email já cadastrado" });
      }

      await Student.create({
        name,
        email,
        age,
        weight,
        height
      });

      return res.send({
        status: "success",
        msg: "Cadastro realizado com sucesso!"
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
}

module.exports = new StudentController();
