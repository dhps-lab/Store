'use strict';

/** @type {import('sequelize-cli').Migration} */

const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      allowNull: false,
      field: 'user_id',
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
