'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'UserId' });
      this.belongsTo(models.Post, { foreignKey: 'PostId' });
    }
  }
  PostLike.init({
    Uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      field: 'UserId',
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional: for liking posts only
      references: {
        model: 'Post',
        key: 'id',
      },
      field: 'PostId',
    },
  }, {
    sequelize,
    modelName: 'PostLike',
    tableName: 'post_likes',
    underscored: true,
  });
  return PostLike;
};