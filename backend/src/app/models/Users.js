const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authJWT = require("../../config/auth");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "users"
    }
  );

  Users.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  Users.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, authJWT.secret, {
      expiresIn: authJWT.time
    });
  };

  return Users;
};
