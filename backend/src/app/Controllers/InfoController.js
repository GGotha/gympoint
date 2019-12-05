const { User } = require("../models");

class InfoController {
  async find(req, res) {
    const getInfoUser = await User.findOne({
      where: { id: req.userId },
      attributes: ["name", "email"],
      raw: true
    });

    return res.json({ getInfoUser });
  }
}

module.exports = new InfoController();
