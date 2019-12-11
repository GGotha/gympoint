const { Students } = require("../models");
const { Users } = require("../models");

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
        (await Users.findOne({
          where: { email }
        })) ||
        (await Students.findOne({
          where: { email }
        }))
      ) {
        return res
          .status(422)
          .json({ status: "error", msg: "Email já cadastrado" });
      }

      await Students.create({
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
  async index(req, res) {
    return res.send(
      await Students.findAll({
        where: {},
        attributes: ["id", "name", "email", "age"]
      })
    );
  }
}

module.exports = new StudentController();
