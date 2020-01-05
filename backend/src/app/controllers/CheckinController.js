const { Students, Checkins } = require("../models");
const { subDays, startOfDay, endOfDay } = require("date-fns");

const { Op } = require("sequelize");

class CheckinController {
  async store(req, res) {
    const id = req.params.id;

    try {
      const findForStore = await Students.findOne({ where: { id } });

      if (!findForStore) {
        return res.send({
          status: "error",
          msg: "Não foi possível encontrar um registro com esse id"
        });
      }

      const dataAtual = new Date();

      const dataInicio = subDays(dataAtual, 7);

      const findCheckin = await Checkins.findAll({
        where: {
          student_id: id,
          created_at: {
            [Op.between]: [startOfDay(dataInicio), endOfDay(dataAtual)]
          }
        },

        raw: true
      });

      if (findCheckin.length >= 5) {
        return res.send({
          status: "error",
          msg:
            "Só é possível realizar 5 checkins dentro de um período de 7 dias"
        });
      }

      const checkinCreate = await Checkins.create({
        student_id: id
      });

      return res.send({
        status: "success",
        msg: "Checkin realizado com sucesso!",
        checkinCreate
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
    const id = req.params.id;

    return res.send(
      await Checkins.findAll({
        where: { student_id: id }
      })
    );
  }
}

module.exports = new CheckinController();
