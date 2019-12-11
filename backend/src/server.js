require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes = require("./routes");
const protectedRoutes = require("./protected-routes");

class Server {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.protectedRoutes();
    this.exception();

    this.express.listen(process.env.PORT);
    console.log(`Servidor inicializado na porta ${process.env.PORT}`);
  }

  middlewares() {
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    this.express.use(routes);
  }

  protectedRoutes() {
    this.express.use(protectedRoutes);
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      let message = "Internal Server Error!";

      // if (process.env.NODE_ENV !== "production") {
      //   const youch = new Youch(err);
      //   message = await youch.toJSON();
      // }

      return res.status(500).send({ message });
    });
  }
}

module.exports = new Server().express;
