"use strict";
const fs = require("fs");
const { loggerInfo } = require("../helpers/loggerDebug");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(
      fs.readFileSync("./data/data.json", "utf-8")
    ).contents;
    loggerInfo(data);
    await queryInterface.bulkInsert("Contents", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contents");
  },
};
