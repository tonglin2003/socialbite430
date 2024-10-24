'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_rate', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // ---- FK ---- //
      RestaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "restaurant",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      // ---- end of FK ---- //
      rate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      review: {
        type: Sequelize.STRING,
        allowNull: true // review is optional for user to give rate
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
    await queryInterface.dropTable('user_rate');
  }
};