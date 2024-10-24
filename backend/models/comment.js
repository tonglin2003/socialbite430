'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "UserId"});
      this.belongsTo(models.Post, {foreignKey: "PostId"});
    }
  }
  Comment.init({
    UserId: {
      type:DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      field: "UserId"      
    },
    PostId: {
      type:DataTypes.INTEGER,
      references: {
        model: "Post",
        key: "id",
      },
      field: "PostId"      
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: "comment",
    underscored: true
  });
  return Comment;
};