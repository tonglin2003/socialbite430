'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
          validate: {
            is: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.:;])[A-Za-z\d@$!%*?&]{8,}$/i, // Minimum 8 characters, at least 1 letter and 1 number and 1 special character in @$!%*?&.:;
          },
      },
      has_restaurant: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      profile_image:{
        type: Sequelize.STRING(1000),
        allowNull: false,
        defaultValue: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};