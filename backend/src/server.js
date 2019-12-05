const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.routesprotects();
  }

  middlewares() {
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  routes() {
    this.express.use(require("./routes"));
  }
  routesprotects() {
    this.express.use(require("./routesprotects"));
  }
}

module.exports = new App().express;
