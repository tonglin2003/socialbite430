'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, {foreignKey: "PostId"});
      this.belongsTo(models.Tag, {foreignKey: "TagId"});
    }
  }
  PostTag.init({
    PostId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Post",
        key: "id",
      },
      field: "PostId"      
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
    modelName: 'PostTag',
    tableName: "post_tag",
    timestamps: false
  });
  return PostTag;
};