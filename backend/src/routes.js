const express = require("express");
const routes = express.Router();

const cors = require("cors");

const SessionController = require("./app/controllers/SessionController");

var allowedOrigins = process.env.CORS_ALLOW.split(",");
routes.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

routes.post("/users/authenticate", SessionController.store);

module.exports = routes;
