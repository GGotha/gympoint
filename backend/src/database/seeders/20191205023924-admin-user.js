const moment = require("moment");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@gympoint.com.br",
        password: await bcrypt.hash("123mudar", 8),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
