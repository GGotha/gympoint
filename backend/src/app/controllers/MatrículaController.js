const { Planos, Matrículas, Students } = require("../models");
const { parseISO, addMonths, isBefore, addHours } = require("date-fns");
const { pt } = require("date-fns/locale");
const Mail = require("../../lib/Mail");
const Yup = require("yup");
const { sequelize } = require("../models");

class MatrículaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive()
        .required(),
      plan_id: Yup.number()
        .integer()
        .positive()
        .required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

    const { student_id, plan_id, start_date } = req.body;

    try {
      const findPlanos = await Planos.findOne({
        where: { id: plan_id }
      });

      const findStudent = await Students.findOne({
        where: { id: student_id },
        raw: true
      });

      const precoDoPlano = findPlanos.price;
      const duracaoDoPlano = findPlanos.duration;

      const validationDate = isBefore(parseISO(start_date), new Date());

      const data_fim = addMonths(parseISO(start_date), duracaoDoPlano);

      if (validationDate === true) {
        return res.send({
          status: "error",
          msg: "Você não pode escolher uma data que já passou"
        });
      }

      await Matrículas.create({
        student_id,
        plan_id,
        start_date,
        end_date: data_fim,
        price: precoDoPlano
      });

      await Mail.sendMail({
        to: `${findStudent.name} <${findStudent.email}>`,
        subject: "Gympoint - Sua matrícula foi criada",
        text: `Sua matrícula foi criada, agradecemos sua confiança
      Detalhes da sua Matrícula:
              Plano: ${findPlanos.title},
              Data de término: ${data_fim},
              Valor: R$ ${precoDoPlano}
              `
      });

      return res.send({
        status: "success",
        msg: "Matrícula realizada com sucesso!"
      });
    } catch (err) {
      console.log(err);
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
  async index(req, res) {
    return res.send(
      await Matrículas.findAll({
        include: [
          {
            model: Planos,
            attributes: ["title"]
          },
          {
            model: Students,
            attributes: ["name"]
          }
        ]
      })
    );
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {
        raw: true
      });

      const findForDelete = await Matrículas.destroy({ where: { id } });

      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", {
        raw: true
      });

      if (!findForDelete) {
        return res.send({
          status: "error",
          msg: "Não é possível deletar uma matrícula inexistente"
        });
      }

      return res.send({
        status: "success",
        msg: "Matrícula removida com sucesso!"
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }

  async put(req, res) {
    const id = req.params.id;

    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive()
        .required(),
      plan_id: Yup.number()
        .integer()
        .positive()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

    const { student_id, plan_id } = req.body;

    try {
      const findForUpdate = await Matrículas.findOne({ where: { id } });

      if (!findForUpdate) {
        return res.send({
          status: "error",
          msg: "Você não pode alterar uma matrícula que não existe"
        });
      }

      await findForUpdate.update({ student_id, plan_id });

      return res.send({
        status: "success",
        msg: "Matrícula alterada com sucesso!"
      });
    } catch (err) {
      console.log(err);
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
  async indexMatriculasById(req, res) {
    const id = req.params.id;

    return res.send(
      await Matrículas.findOne({
        where: { id },
        include: [{ model: Students }, { model: Planos }]
      })
    );
  }
}

module.exports = new MatrículaController();
