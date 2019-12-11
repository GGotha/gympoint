const express = require("express");
const protectedRoutes = express.Router();
const authMiddleware = require("./app/middlewares/auth");
const cors = require("cors");

const StudentController = require("./app/controllers/StudentController");
const PlanoController = require("./app/controllers/PlanoController");
const MatrículaController = require("./app/controllers/MatrículaController");
const HelpOrdersController = require("./app/controllers/HelpOrdersController");

protectedRoutes.use(authMiddleware);

var allowedOrigins = process.env.CORS_ALLOW.split(",");
protectedRoutes.use(
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

protectedRoutes.post("/students", StudentController.store);
protectedRoutes.get("/students", StudentController.index);
protectedRoutes.post("/planos", PlanoController.store);
protectedRoutes.get("/planos", PlanoController.index);
protectedRoutes.delete("/planos/:id", PlanoController.delete);
protectedRoutes.put("/planos/:id", PlanoController.put);
protectedRoutes.post("/matriculas", MatrículaController.store);
protectedRoutes.get("/matriculas", MatrículaController.index);
protectedRoutes.delete("/matriculas/:id", MatrículaController.delete);
protectedRoutes.put("/matriculas/:id", MatrículaController.put);
protectedRoutes.post(
  "/help-orders/:id/anwser",
  HelpOrdersController.anwserStudents
);
protectedRoutes.get("/help-orders", HelpOrdersController.indexUnanswered);

module.exports = protectedRoutes;
