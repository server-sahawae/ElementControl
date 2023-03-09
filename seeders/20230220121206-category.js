"use strict";
const fs = require("fs");
const { loggerInfo } = require("../helpers/loggerDebug");
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(
      fs.readFileSync("./data/data.json", "utf-8")
    ).categories;
    loggerInfo(data);
    await queryInterface.bulkInsert("Categories", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories");
  },
};
