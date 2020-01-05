const { Students, HelpOrders } = require("../models");
const Mail = require("../../lib/Mail");
const Yup = require("yup");

class HelpOrdersController {
  async store(req, res) {
    const id = req.params.id;

    const schema = Yup.object().shape({
      question: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

    const { question } = req.body;

    const findStudentById = await Students.findOne({
      where: { id },
      raw: true
    });

    if (findStudentById === null) {
      return res.send({
        status: "error",
        msg: "Usuário inexistente"
      });
    }

    try {
      await HelpOrders.create({
        student_id: id,
        question
      });

      return res.send({
        status: "success",
        msg: "Help order criada com sucesso!"
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
  async index(req, res) {
    const id = req.params.id;

    return res.send(await HelpOrders.findAll({ where: { student_id: id } }));
  }

  async indexUnanswered(req, res) {
    return res.send(
      await HelpOrders.findAll({
        where: { answer: null },
        include: [
          {
            model: Students,
            attributes: ["name"]
          }
        ]
      })
    );
  }

  async answerStudents(req, res) {
    const id = req.params.id;

    const schema = Yup.object().shape({
      answer: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

    const { answer } = req.body;

    try {
      const findHelpOrders = await HelpOrders.findOne({
        where: { id },
        include: [
          {
            model: Students,
            attributes: ["name", "email"]
          }
        ]
      });

      findHelpOrders.update({ answer, answer_at: new Date() });

      await Mail.sendMail({
        to: `${findHelpOrders.Student.name} <${findHelpOrders.Student.email}>`,
        subject: "Gympoint - Sua dúvida foi respondida",
        text: `Sua pergunta: ${findHelpOrders.question} 
Resposta: ${answer}
        `
      });

      return res.send({
        status: "success",
        msg: "Help order respondida com sucesso!"
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
  async indexHelpOrdersById(req, res) {
    const id = req.params.id;

    return res.send(
      await HelpOrders.findOne({
        where: { id }
      })
    );
  }

  async indexHelpOrdersByIdAndStudentsById(req, res) {
    const id = req.params.id;
    const idHelpOrder = req.params.idHelpOrder;

    try {
      const findHelpOrdersByIdAndStudentsByID = await HelpOrders.findOne({
        where: { id: idHelpOrder, student_id: id }
      });

      if (!findHelpOrdersByIdAndStudentsByID) {
        return res.send({
          status: "error",
          msg: "Não existe foi possível encontrar essa help order ou esse aluno"
        });
      }

      return res.send(findHelpOrdersByIdAndStudentsByID);
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
}

module.exports = new HelpOrdersController();
