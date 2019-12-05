const { User } = require("../models");
const { Meetup } = require("../models");
const moment = require("moment");
const Yup = require("yup");
const { startOfHour, parseISO, isBefore } = require("date-fns");

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      descricao: Yup.string().required(),
      localizacao: Yup.string().required(),
      data: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ status: "error", msg: "Erro na validação" });
    }

    const { titulo, descricao, localizacao, data } = req.body;

    const hourStart = startOfHour(parseISO(data));

    if (isBefore(hourStart, new Date())) {
      return res.json({
        status: "error",
        msg: "Datas passadas não são permitidas"
      });
    }

    const addMeetupBD = await Meetup.create({
      user_id: req.userId,
      titulo,
      descricao,
      localizacao,
      data
    });

    return res.json(addMeetupBD);
  }
  async list(req, res) {
    const { page = 1 } = req.query;

    try {
      const getMeetupsUser = await Meetup.findAll({
        where: { user_id: req.userId },
        attributes: ["id", "titulo", "descricao", "localizacao", "data"],
        order: ["data"],
        limit: 10,
        offset: (page - 1) * 10
      });

      return res.json({
        status: "success",
        msg: "Meetups encontradas com sucesso",
        getMeetupsUser
      });
    } catch (error) {
      return res.json({
        status: "error",
        msg: "Ocorreu um erro interno, por favor, tente novamente mais tarde"
      });
    }
  }
  async listById(req, res) {
    const idMeetup = req.params.id;

    try {
      const getAllInfoUser = await User.findOne({
        where: { id: req.userId },
        raw: true
      });

      const { id: idCliente } = getAllInfoUser;

      const getArtigoById = await Meetup.findOne({
        where: { user_id: idCliente, id: idMeetup },
        raw: true
      });

      const { titulo, descricao, localizacao, imagem, data } = getArtigoById;

      return res.send({
        status: "success",
        msg: "Meetup Encontrada",
        titulo,
        descricao,
        localizacao,
        imagem,
        data
      });
    } catch (error) {
      return res.status(200).send({
        status: "error",
        msg: "Erro ao encontrar meetup, tente novamente mais tarde"
      });
    }
  }

  async listAll(req, res) {
    try {
      const getMeetupsUser = await Meetup.findAll({
        attributes: [
          "id",
          "titulo",
          "descricao",
          "localizacao",
          "imagem",
          "data"
        ]
      });

      return res.json({
        status: "success",
        msg: "Meetups encontradas com sucesso",
        getMeetupsUser
      });
    } catch (error) {
      return res.json({
        status: "error",
        msg: "Ocorreu um erro interno, por favor, tente novamente mais tarde"
      });
    }
  }
}

module.exports = new MeetupController();
