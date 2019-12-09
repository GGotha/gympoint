const { Students, HelpOrders } = require("../models");

class HelpOrdersController {
  async store(req, res) {
    const id = req.params.id;

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

  async anwserStudents(req, res) {
    const id = req.params.id;

    const { answer } = req.body;

    try {
      const findHelpOrders = await HelpOrders.findOne({ where: { id } });

      findHelpOrders.update({ answer, answer_at: new Date() });

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
}

module.exports = new HelpOrdersController();
