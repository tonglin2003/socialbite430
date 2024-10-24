'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "UserId"});
    }
  }
  Restaurant.init({
    UserId: {
      type:DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      field: "UserId"      
    },
    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0, 
      validate: {
        min: 0,
        max: 5, 
      },
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    heroImage: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: "https://www.shutterstock.com/image-photo/long-wide-banner-natural-herbal-260nw-1661454901.jpg"
    },
    profileImage: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    },
  }, {
    sequelize,
    modelName: 'Restaurant',
    tableName: "restaurant",
    underscored: true
  });
  return Restaurant;
};