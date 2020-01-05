const { Students } = require("../models");
const { Users } = require("../models");
const Yup = require("yup");
const { sequelize } = require("../models");

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .required()
        .positive()
        .integer(),
      peso: Yup.number()
        .required()
        .positive(),
      altura: Yup.number()
        .required()
        .positive()
    });

    if (req.body.peso !== undefined) {
      var pesoValidation = req.body.peso.replace(",", ".");
    }

    if (req.body.altura !== undefined) {
      var alturaValidation = req.body.altura.replace(",", ".");
    }

    if (
      !(await schema.isValid({
        ...req.body,
        peso: pesoValidation,
        altura: alturaValidation
      }))
    ) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

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
        return res.json({ status: "error", msg: "Email já cadastrado" });
      }

      await Students.create({
        name,
        email,
        age,
        weight: pesoValidation,
        height: alturaValidation
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
        attributes: ["id", "name", "email", "age"]
      })
    );
  }

  async indexStudentsById(req, res) {
    const id = req.params.id;

    return res.send(
      await Students.findOne({
        where: { id }
      })
    );
  }

  async put(req, res) {
    const id = req.params.id;

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .required()
        .positive()
        .integer(),
      peso: Yup.number()
        .required()
        .positive(),
      altura: Yup.number()
        .required()
        .positive()
    });

    if (req.body.peso !== undefined) {
      var pesoValidation = req.body.peso.replace(",", ".");
    }

    if (req.body.altura !== undefined) {
      var alturaValidation = req.body.altura.replace(",", ".");
    }

    if (
      !(await schema.isValid({
        ...req.body,
        peso: pesoValidation,
        altura: alturaValidation
      }))
    ) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

    const { nome, email, idade, peso, altura } = req.body;

    try {
      const findStudentById = await Students.findOne({ where: { id } });

      if (!findStudentById) {
        return res.send({
          status: "error",
          msg: "Não é possível alterar um aluno inexistente"
        });
      }

      if (findStudentById.email === email) {
        findStudentById.update({
          name: nome,
          email,
          age: idade,
          weight: pesoValidation,
          height: alturaValidation
        });

        return res.send({
          status: "success",
          msg: "Aluno alterado com sucesso!"
        });
      }

      if (
        (await Users.findOne({
          where: { email }
        })) ||
        (await Students.findOne({
          where: { email }
        }))
      ) {
        return res.json({
          status: "error",
          msg:
            "Não foi possível alterar o aluno, pois o email inserido já está sendo usado"
        });
      }

      findStudentById.update({
        name: nome,
        email,
        age: idade,
        weight: pesoValidation,
        height: alturaValidation
      });

      return res.send({
        status: "success",
        msg: "Aluno alterado com sucesso!"
      });
    } catch (err) {
      console.log(err.name);
      return res.send({
        status: "error",
        msg: "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {
        raw: true
      });

      const findForDelete = await Students.destroy({
        where: { id }
      });

      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", {
        raw: true
      });

      if (!findForDelete) {
        return res.send({
          status: "error",
          msg: "Não é possível deletar um aluno inexistente"
        });
      }

      return res.send({
        status: "success",
        msg: "Aluno removido com sucesso!"
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
