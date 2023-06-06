
'use strict';
const {faker} = require('@faker-js/faker');
const todos = [...Array(100)].map((todo) => (
  {

    firstName: faker.lorem.words(),
    lastName:  faker.lorem.words(),
    email: faker.lorem.words(),
    createdAt: new Date(),
    updatedAt: new Date()
    
  }
))


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('posts', todos , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null , {});
  }
};



