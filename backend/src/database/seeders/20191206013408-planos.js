const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("planos", [
      {
        id: "1",
        title: "Start",
        duration: moment().format("YYYY-MM-DD HH:mm:ss"),
        price: "129",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        id: "2",
        title: "Gold",
        duration: moment().format("YYYY-MM-DD HH:mm:ss"),
        price: "109",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        id: "3",
        title: "Diamond",
        duration: moment().format("YYYY-MM-DD HH:mm:ss"),
        price: "89",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("planos", null, {});
  }
};
