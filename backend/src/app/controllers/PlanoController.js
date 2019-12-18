const { Planos } = require("../models");
const Yup = require("yup");

class PlanoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.string()
        .number()
        .integer()
        .positve()
        .required(),
      price: Yup.number()
        .positive()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ status: "error", msg: "Erro na validação" });
    }

    const { title, duration, price } = req.body;

    await Planos.create({ title, duration, price });

    return res.send({ status: "success", msg: "Plano criado com sucesso!" });
  }

  async index(req, res) {
    return res.send(await Planos.findAll());
  }

  async delete(req, res, next) {
    const id = req.params.id;

    try {
      const findForDelete = await Planos.destroy({ where: { id } });

      if (findForDelete === 0) {
        return res.send({
          status: "error",
          msg: "Não é possível deletar um plano inexistente"
        });
      }

      return res.send({
        status: "success",
        msg: "Plano removido com sucesso!"
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }

  async put(req, res, next) {
    const id = req.params.id;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.string()
        .number()
        .integer()
        .positve()
        .required(),
      price: Yup.number()
        .positive()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ status: "error", msg: "Erro na validação" });
    }

    const { title, duration, price } = req.body;

    try {
      const findForUpdate = await Planos.findOne({ where: { id } });

      await findForUpdate.update({ title, duration, price });

      return res.send({
        status: "success",
        msg: "Plano alterado com sucesso!"
      });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!"
      });
    }
  }
}

module.exports = new PlanoController();
