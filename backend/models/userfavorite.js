'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "UserId"});
      this.belongsTo(models.Restaurant, {foreignKey: "RestaurantId"});
    }
  }
  UserFavorite.init({
    UserId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      field: "UserId"      
    },
    RestaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Restaurant",
        key: "id",
      },
      field: "RestaurantId"
    },
  }, {
    sequelize,
    modelName: 'UserFavorite',
    tableName: "user_favorite",
    underscored: true
  });
  return UserFavorite;
};