'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "UserId"});
      this.belongsTo(models.Tag, {foreignKey: "TagId"});
    }
  }
  UserTag.init({
    UserId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      field: "UserId"      
    },
    TagId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tag",
        key: "id",
      },
      field: "TagId"      
    },
  }, {
    sequelize,
    modelName: 'UserTag',
    tableName: "user_tag",
    timestamps: false
  });
  return UserTag;
};