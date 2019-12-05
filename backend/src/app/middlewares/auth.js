const jwt = require("jsonwebtoken");
const authJWT = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ error: "Token inválido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authJWT.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.json({ error: "Token inválido" });
  }
};
