require("dotenv").config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  define: {
    paranoid: false,
    timestamps: true,
    freezeTableName: true,
    underscored: true
  },
  timezone: "-03:00"
};
