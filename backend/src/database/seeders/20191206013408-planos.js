const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("planos", [
      {
        id: "1",
        title: "Start",
        duration: 1,
        price: "129.00",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        id: "2",
        title: "Gold",
        duration: 3,
        price: "109.00",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        id: "3",
        title: "Diamond",
        duration: 6,
        price: "89.00",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("planos", null, {});
  }
};
