const express = require("express");
const protectedRoutes = express.Router();
const authMiddleware = require("./app/middlewares/auth");
const cors = require("cors");

const StudentController = require("./app/controllers/StudentController");
const PlanoController = require("./app/controllers/PlanoController");
const MatrículaController = require("./app/controllers/MatrículaController");

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
protectedRoutes.post("/planos", PlanoController.store);
protectedRoutes.get("/planos", PlanoController.index);
protectedRoutes.delete("/planos/:id", PlanoController.delete);
protectedRoutes.put("/planos/:id", PlanoController.put);
protectedRoutes.post("/matriculas", MatrículaController.store);

module.exports = protectedRoutes;
