const { Files } = require("../models/");
const { User } = require("../models");

class FileController {
  async store(req, res) {
    const { filename: path, originalname } = req.file;

    const getAllInfoUser = await User.findOne({
      where: { id: req.userId },
      raw: true
    });

    const { id: idCliente } = getAllInfoUser;

    const file = await Files.create({
      user_id: idCliente,
      name: originalname,
      path
    });

    return res.json(file);
  }
}

module.exports = new FileController();
