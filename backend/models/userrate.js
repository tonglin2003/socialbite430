'use strict';
const {
  Model, Sequelize, DataTypes, literal 
} = require('sequelize');
module.exports = (sequelize) => {
  class UserRate extends Model {
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
  UserRate.init({
    RestaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Restaurant",
        key: "id",
      },
      field: "RestaurantId"
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      field: "UserId"      
    },
    rate: {
      type:DataTypes.FLOAT,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserRate',
    tableName: "user_rate",
    underscored: true
  });


  UserRate.addHook('afterCreate', async (userRate, options) => {
    await recalculateAverageRate(userRate.RestaurantId);
  });

  UserRate.addHook('afterUpdate', async (userRate, options) => {
    await recalculateAverageRate(userRate.RestaurantId);
  });

  UserRate.addHook('afterDestroy', async (userRate, options) => {
    await recalculateAverageRate(userRate.RestaurantId);
  });

  async function recalculateAverageRate(restaurantId) {
    const averageRate = await UserRate.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('rate')), 'averageRate']],
      where: {
        RestaurantId: restaurantId,
      },
    });

    const newRate = parseFloat(averageRate[0].dataValues.averageRate || 0).toFixed(1);
    await sequelize.models.Restaurant.update(
      { rate: newRate },
      { where: { id: restaurantId } }
    );
  }
    
  return UserRate;
};