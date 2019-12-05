const express = require("express");
const routesprotects = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const cors = require("cors");

const authMiddleware = require("./app/middlewares/auth");
const UserController = require("./app/Controllers/UserController");
const MeetupController = require("./app/Controllers/MeetupController");
const InfoController = require("./app/Controllers/InfoController");
const FileController = require("./app/Controllers/FileController");

routesprotects.use(authMiddleware);

var allowedOrigins = process.env.CORS_ALLOW.split(",");
routesprotects.use(
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

const upload = multer(multerConfig);

// routesprotects.put("/pass", UserController.updatePass);
routesprotects.post("/meetups", MeetupController.store);
routesprotects.get("/meetup", MeetupController.list);
routesprotects.get("/meetup/all", MeetupController.listAll);
routesprotects.get("/meetup/:id", MeetupController.listById);
routesprotects.get("/find", InfoController.find);
routesprotects.put("/resetpass", UserController.update);
routesprotects.post("/files", upload.single("file"), FileController.store);

module.exports = routesprotects;
