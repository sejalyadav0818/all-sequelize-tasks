"use strict";

const { faker } = require("@faker-js/faker");
const user = [...Array(1000)].map((use) => ({
  name: faker.name.firstName(),
  title: faker.name.firstName(),
  favorite: faker.internet.email(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("customer_tables", user, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("customer_tables", null, {});
  },
};
