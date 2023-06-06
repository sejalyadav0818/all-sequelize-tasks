"use strict";

const { faker } = require("@faker-js/faker");
const user = [...Array(1000)].map((use) => ({
  firstname: faker.name.firstName(),
  lastName: faker.name.firstName(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", user, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
