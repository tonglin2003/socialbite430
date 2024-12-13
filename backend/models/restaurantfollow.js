'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantFollow extends Model {
    static associate(models) {
      // Define relationships
      this.belongsTo(models.User, { foreignKey: 'UserId' });
      this.belongsTo(models.Restaurant, { foreignKey: 'RestaurantId' });
    }
  }
  RestaurantFollow.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Refers to the 'users' table
        key: 'id',
      },
      field: 'UserId',
    },
    RestaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurant', // Refers to the 'restaurants' table
        key: 'id',
      },
      field: 'RestaurantId',
    },
  }, {
    sequelize,
    modelName: 'RestaurantFollow',
    tableName: 'restaurant_follows',
    timestamps: false, // Ensure timestamps are enabled
  });
  return RestaurantFollow;
};