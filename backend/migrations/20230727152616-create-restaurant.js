'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaurant', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      restaurant_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rate: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5, 
        },
      },
      popularity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      hero_image: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        defaultValue: "https://www.shutterstock.com/image-photo/long-wide-banner-natural-herbal-260nw-1661454901.jpg"
      },
      profile_image: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        defaultValue: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
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

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('restaurant');
  }
};