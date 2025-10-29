'use strict';

const user = require('../models/user');
const authUtils = require('../utils/auth.utils');

const demoUsers = [
  {
    firstName: 'User1',
    lastName: 'Test',
    username: 'testuser1',
    password: 'testuser1password',
    email: 'testuser1@araresearch.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: 'User2',
    lastName: 'Test',
    username: 'testuser2',
    password: 'testuser2password',
    email: 'testuser2@araresearch.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: 'User3',
    lastName: 'Test',
    username: 'testuser3',
    password: 'testuser3password',
    email: 'testuser3@araresearch.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const user of demoUsers) {
      user.password = await authUtils.hashPassword(user.password);
    }
    return queryInterface.bulkInsert('Users', demoUsers);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
