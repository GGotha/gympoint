const { Planos, Matrículas } = require("../models");
const { parseISO, addMonths, isBefore, addHours } = require("date-fns");
const { pt } = require("date-fns/locale");

class MatrículaController {
  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    try {
      const findPlanos = await Planos.findOne({ where: { id: plan_id } });

      const precoDoPlano = findPlanos.price;
      const duracaoDoPlano = findPlanos.duration;

      const validationDate = isBefore(parseISO(start_date), new Date(), {
        locale: pt
      });

      if (validationDate === true) {
        return res.send({
          status: "error",
          msg: "Você não pode escolher uma data que já passou"
        });
      }

      const data_fim = addMonths(parseISO(start_date), duracaoDoPlano, {
        locale: pt
      });

      await Matrículas.create({
        student_id,
        plan_id,
        start_date,
        end_date: data_fim,
        price: precoDoPlano
      });

      return res.send({
        status: "success",
        msg: "Matrícula realizada com sucesso!"
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
}

module.exports = new MatrículaController();
