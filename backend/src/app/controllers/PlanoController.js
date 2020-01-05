const { Planos } = require("../models");
const Yup = require("yup");
const { sequelize } = require("../models");

class PlanoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required()
    });

    if (req.body.price !== undefined) {
      var priceValidation = req.body.price.replace(",", ".");

      if (priceValidation.split("R$").length === 2) {
        var priceValidation = priceValidation.split("R$")[1];
      }
    }

    if (!(await schema.isValid({ ...req.body, price: priceValidation }))) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

    const { title, duration } = req.body;

    try {
      await Planos.create({ title, duration, price: priceValidation });
      return res.send({ status: "success", msg: "Plano criado com sucesso!" });
    } catch (err) {
      return res.send({
        status: "error",
        msg: "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      });
    }
  }

  async index(req, res) {
    return res.send(await Planos.findAll());
  }

  async delete(req, res, next) {
    const id = req.params.id;

    try {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {
        raw: true
      });

      const findForDelete = await Planos.destroy({ where: { id } });

      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", {
        raw: true
      });

      if (!findForDelete) {
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
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ status: "error", msg: "Falha na validação" });
    }

    const { title, duration, price } = req.body;

    try {
      const findForUpdate = await Planos.findOne({ where: { id } });

      if (!findForUpdate) {
        return res.send({
          status: "error",
          msg: "Você não pode alterar um plano que não existe"
        });
      }

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
  async indexPlanosById(req, res) {
    const id = req.params.id;

    return res.send(
      await Planos.findOne({
        where: { id }
      })
    );
  }
}

module.exports = new PlanoController();
