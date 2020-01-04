const express = require("express");
const routes = express.Router();

const cors = require("cors");

const SessionController = require("./app/controllers/SessionController");
const CheckinController = require("./app/controllers/CheckinController");
const HelpOrdersController = require("./app/controllers/HelpOrdersController");

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
routes.post(
  "/students/mobile-authenticate/:id",
  SessionController.mobileAuthenticate
);

routes.post("/students/:id/checkins", CheckinController.store);
routes.get("/students/:id/checkins", CheckinController.index);

routes.post("/students/:id/help-orders", HelpOrdersController.store);
routes.get("/students/:id/help-orders", HelpOrdersController.index);
routes.get(
  "/students/:id/help-orders/:idHelpOrder",
  HelpOrdersController.indexHelpOrdersByIdAndStudentsById
);

module.exports = routes;
