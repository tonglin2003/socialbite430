'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongs to user relationship
      this.belongsTo(models.User, {foreignKey: "UserId"});
      // belongs to restaurant
      this.belongsTo(models.Restaurant, {foreignKey: "RestaurantId"});
      // many to many relationship with tag, (Post to Tag)
      this.belongsToMany(models.Tag, { through: models.PostTag, foreignKey: 'TagId' });
      // one to many relationship with comment
      this.hasMany(models.Comment, {foreignKey: "PostId"});

    }
  }
  Post.init({
    // ----- FK ------ //
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
      allowNull: true, // allow the restaurant id to be null, representing this is a post from a user, not a restaurant!!
      references: {
        model: "Restaurant",
        key: "id"
      },
      field: "RestaurantId"
    },
    // ---- End of FK ---- //
    postTitle: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    postContent: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    postImg:{
      type: DataTypes.STRING,
      allowNull:true,
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: "post",
    underscored: true
  });
  return Post;
};