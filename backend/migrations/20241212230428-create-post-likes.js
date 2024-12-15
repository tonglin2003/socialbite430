'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post_likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user', // Table name for users
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Deletes likes if user is deleted
      },
      PostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'post', // Table name for posts
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Deletes likes if post is deleted
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('post_likes');
  },
};
