const { Students, Checkins } = require("../models");
const { addDays, format, parseISO } = require("date-fns");

class CheckinController {
  async store(req, res) {
    const id = req.params.id;

    try {
      const findForStore = await Students.findOne({ where: { id } });

      if (findForStore === null) {
        return res.send({
          status: "error",
          msg: "Não foi possível encontrar um registro com esse id"
        });
      }

      const findCheckin = await Checkins.findAll({
        where: { student_id: id },
        raw: true
      });

      if (findCheckin.length >= 1) {
        const dataDaqui7Dias = addDays(findCheckin[0].createdAt, 7);

        let sql = `
          SELECT * FROM checkins WHERE student_id=$3 AND created_at BETWEEN $1 AND $2
      `;

        var data = await Checkins.sequelize.query(sql, {
          bind: [findCheckin[0].createdAt, dataDaqui7Dias, id],
          raw: true,
          type: Checkins.sequelize.QueryTypes.SELECT
        });
      }

      //Primeiro checkin do estudante

      if (data === undefined) {
        const checkinCreate = await Checkins.create({
          student_id: findForStore.id
        });

        return res.send({
          status: "success",
          msg: "Checkin realizado com sucesso!",
          checkinCreate
        });
      }

      if (data.length >= 5) {
        return res.send({
          status: "error",
          msg:
            "Só é possível realizar 5 checkins dentro de um período de 7 dias"
        });
      }

      const checkinCreate = await Checkins.create({
        student_id: findForStore.id
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
