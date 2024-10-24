'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('post_tag', {
      PostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'post', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      TagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tag',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('post_tag');
  }
};
