'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      // ---- FK ---- //
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
      RestaurantId: {
        type: Sequelize.INTEGER,
        allowNull: true, // allow null for restaurant id to state it is a user post
        references: {
          model: "restaurant",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // ----- End of FK ---- //
      post_title: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      post_content: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('post');
  }
};