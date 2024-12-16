const express = require("express");
const router = express.Router();
const { Restaurant, Post, Comment, sequelize, UserTag, Tag, PostTag, User, PostLike} = require("../models");
const { autheticateUser } = require("../middleware/authUser");
const {userAllowPosition} = require("../middleware/userAllowPosition");
const { Op,QueryTypes } = require("sequelize");

// Add a like to a post
router.post("/:postId/like", autheticateUser, async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const userId = parseInt(req.session.userId, 10);
  
    try {
      // Check if the post exists
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if the user already liked the post
      const existingLike = await PostLike.findOne({
        where: {
          UserId: userId,
          PostId: postId,
        },
      });
  
      if (existingLike) {
        return res.status(400).json({ message: "You have already liked this post." });
      }
  
      //Create the like
      await PostLike.create({ UserId: userId, PostId: postId });
      return res.status(201).json({ message: "Post liked successfully." });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while liking the post.", error: error.message });
    }
});

//remove a like from a post by Id
router.delete("/:postId/unlike", autheticateUser, async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const userId = parseInt(req.session.userId, 10); // Get the user ID from the session
  
    try {
      // Check if the like exists
      const like = await PostLike.findOne({
        where: { UserId: userId, PostId: postId },
      });
  
      if (!like) {
        return res.status(404).json({ message: "Like not found for this post." });
      }
  
      // Remove the like
      await like.destroy();
      return res.status(200).json({ message: "Like removed successfully." });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while removing the like.",
        error: error.message,
      });
    }
  });

  //get number of likes by post id
  router.get("/:postId/likes/count", async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
  
    try {
      // Check if the post exists
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
  
      // Count the number of likes for the post
      const likeCount = await PostLike.count({
        where: { PostId: postId },
      });
  
      return res.status(200).json({ postId, likeCount });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while counting likes for the post.",
        error: error.message,
      });
    }
  });

  //Get All Posts Liked by a User
  router.get("/likes", autheticateUser, async (req, res) => {
    const userId = parseInt(req.session.userId, 10); // Get user ID from session
  
    try {
      // Find all posts liked by the user
      const likedPosts = await PostLike.findAll({
        where: { UserId: userId },
        include: [
          {
            model: Post,
            include: [
                {
                  model: Restaurant,
                },
              ],
          },
        ],
      });
  
      return res.status(200).json({ likedPosts });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while fetching liked posts.",
        error: error.message,
      });
    }
  });
  
  

// Get all posts of a restaurant in the db based on their restaurantId
router.get("/:restaurantId", async (req, res)=>{
    const restaurantId = parseInt(req.params.restaurantId, 10);
    try{
        // Find all posts where Id is equal to our parsed parameter
        const posts = await Post.findAll({
            where: {
                RestaurantId: restaurantId
            },
            include: 
            [{
                model: User,
                attributes: ["username"]
            },
            {
                model: Restaurant,
                attributes: ["restaurantName", "profileImage", "id"]
            }
        ],
        });

        // if there are no posts under the restaurant
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this restaurant." });
          }

        // If all okay, return response of all posts
        return res.status(200).json(posts);

    // Catch errors during runtime
    } catch(error) {
        // Log a message
        const errorMessage = error.message;
        return res.status(500).json({
            message: "An error occured when fetching for restaurants",
            error: errorMessage
        })
    }
});

// Get post by post id
router.get("/post/:postId", async (req, res)=>{
    const postId = parseInt(req.params.postId, 10);
    try{
        // Find all posts where Id is equal to our parsed parameter
        const post = await Post.findOne({
            where: {
                id: postId
            },
            include: 
            [{
                model: User,
                attributes: ["username"]
            },
            {
                model: Restaurant,
                attributes: ["restaurantName", "profileImage", "id"]
            }
        ],
        });
        
        // If no post found, return 404
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // If all okay, return post
        return res.status(200).json(post);

    // Catch errors during runtime
    } catch(error) {
        // Log a message
        const errorMessage = error.message;
        return res.status(500).json({
            message: "An error occured when fetching for post",
            error: errorMessage
        })
    }
});

// add all the tags attached to the post onto the post_tag table
async function addPostTagsToTable(newPost, tagList, res){
    try{
        // make sure all tags are inside the Tag table and return it to insertedTag
        const insertedTags = await Promise.all(
            tagList.map((tagName) => {
                return Tag.findOrCreate({ where: { tag: tagName } });
            })
        );   

        // Get the tagIds from insertedTags
        const tagIds = insertedTags.map((insertedTag) => insertedTag[0].id);

        if (tagIds.length === 0) {
            console.log("No tags to insert.");
            return;
          }
        
        // Execute the SQL query to insert into post_tag table
        // unnest function can create numbers of rows for tagIds if given a list
        await sequelize.query(
            `
            INSERT INTO post_tag ("PostId", "TagId")
            SELECT :postId, t.id
            FROM unnest(ARRAY[:tagIds]) AS t(id)
            `,
            {
              replacements: { postId: newPost.id, tagIds: tagIds },
              type: QueryTypes.INSERT,
            }
          );
    
    }catch(error){
        console.error("Error in addPostTagsToTable:", error);
        throw error;
    }
}

// post a post for a restaurant, the user must be the restaurant owner && logged in
router.post("/:restaurantId", autheticateUser, async(req, res)=>{
    const restauarantId = parseInt(req.params.restaurantId, 10);

    try{

        // fetch inside Restaurant table, if the UserId is equal to logged in userId
        const restauarant = await Restaurant.findOne({
            where: {
                id: restauarantId, 
            }
        });

        if (!restauarant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        if (restauarant.UserId !== parseInt(req.session.userId,10)){
            return res.status(403).json({ message: "You are not the owner of the restaurant. Access denied" });
        }

        // create a post in the Post table
        const post = await Post.create({
            UserId: parseInt(req.session.userId,10),
            RestaurantId: restauarantId,
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postImg: req.body.postImg
        });

        // add all post into the post_tag table
        if (req.body.tags){
            await addPostTagsToTable(post, req.body.tags, res);
        }

        return res.status(201).json({
            message: "The post is created successfully",
            postTitle: post.postTitle
        });

    }catch(error){
        const errorMessage = error.message;
        const errorStack = error.stack;
        return res.status(500).json({
            message: "An error occured while creating a post",
            error: errorMessage
        });
    }
});

//post a comment onto a post
router.post("/:postId/comment", autheticateUser, async(req, res)=>{
    const postId = parseInt(req.params.postId,10);

    try{
        // fetch for the postId and restaurantId to see if they exist
        const post = await Post.findOne({where: {id: postId}});

        // if post exist, create a new comment
        if (post){
            const newComment = await Comment.create({
                UserId: parseInt(req.session.userId,10),
                PostId: postId,
                content: req.body.content
            });

            return res.status(201).json({
                message: "The comment is created successfully",
                content: newComment.content
            });
        }
        else{
            return res.status(404).json({message: "Post Not Found"});
        }

    }catch(error){
        const errorMessage = error.message;
        return res.status(500).json({
            message: "An error occured while creating a post",
            error: errorMessage
        });
    }
});

//get all comment of a restaurant post
router.get("/:postId/comment", async(req, res)=>{
    const postId = parseInt(req.params.postId,10);

    try{
        // fetch for the postId and restaurantId to see if they exist
        const comments = await Comment.findAll({
            where: {PostId: postId},
            include: {
                model: User,
                attributes: ["username", "profileImage"]
            },
            order: [["createdAt", "DESC"]],
        });

        // if post exist, create a new comment
        if (comments.length > 0){

            return res.status(200).json(comments);
        }
        else{
            return res.status(404).json({message: "No Comments Found"});
        }

    }catch(error){
        const errorMessage = error.message;
        return res.status(500).json({
            message: "An error occured when fetching comments",
            error: errorMessage
        });
    }
});

// get all post that are associated with user's interest
router.get("/user/interested_post", autheticateUser, async (req, res) => {
  try {
      // Get all user's interested tags
      const userInterestedTags = await UserTag.findAll({ where: { UserId: parseInt(req.session.userId, 10) } });
      const userInterestedTagId = userInterestedTags.map((element) => element.TagId);

      // If not interested in any tag, return 404
      if (userInterestedTagId.length === 0) {
          return res.status(404).json({ message: "No Tags Interested" });
      }

      // Look for Post that user is interested in based on the userInterestedTags
      const userInterestedPosts = await PostTag.findAll({
          where: {
              TagId: {
                  [Op.in]: userInterestedTagId,
              },
          },
          include: [
              {
                  model: Post,
                  attributes: ["id", "postTitle", "postContent", "postImg"], 
                  include: [
                      {
                          model: Restaurant,
                          attributes: ["restaurantName", "profileImage", "id"],
                      },
                  ],
              },
          ],
      });

      const posts = userInterestedPosts.map((item) => item.Post);

      if (posts.length === 0) {
          return res.status(404).json({ message: "No Posts Interested" });
      } else {
          return res.status(200).json(posts);
      }
  } catch (error) {
      return res
          .status(500)
          .json({ message: "An error occurred when fetching for restaurants", error: error.stack, errorMessage: error.message });
  }
});


// get all post nearby restaurant post, if user allowed share location
router.get("/user/nearby_post/:radiusKm", userAllowPosition, async(req,res)=>{
    // get the list of restaurant near the user, and allow user to choose the radiusKm
    const radiusMeters = parseFloat(req.params.radiusKm) * 1000;
    const userLatitude = parseFloat(req.session.userLocation.latitude);
    const userLongitude = parseFloat(req.session.userLocation.longitude);
    
    try{
        // use sequelize.query to select from the database using extension of earth_distance
        const nearbyRestaurants = await sequelize.query(
            `
            SELECT id FROM "restaurant"
            WHERE earth_box(ll_to_earth(?, ?), ?) @> ll_to_earth("latitude", "longitude")
            `,
            {
                replacements: [userLatitude, userLongitude, radiusMeters], // replacement for the question marks
                type: QueryTypes.SELECT
            },
        );

        // got the list of the nearby Restaurants
        if (nearbyRestaurants.length > 0) {
            const nearbyRestaurantList = nearbyRestaurants.map(restaurant => restaurant.id);
            const postOfNearbyRestaurants = await Post.findAll({
                where: {
                  RestaurantId: {
                    [Op.in]: nearbyRestaurantList,
                  },
                },
                include: [
                {
                    model: User,
                    attributes: ["username"]
                },
                {
                  model: Restaurant,
                  attributes: ["restaurantName", "profileImage", "id"],
                }],
              });
        
        

          return res.status(200).json(postOfNearbyRestaurants)
        } else {
          return res.status(404).json({ message: "No restaurant nearby" });
        }
    } catch(error){
        const errorMessage = error.message;
        return res.status(500).json({message: "An error occured when fetching for restaurants", error: errorMessage, errorStack: error.stack});
    }

});

// post a new tag onto a post
router.post("/editTag/:postId/:tagId", autheticateUser, async(req,res)=>{
    try {
        const postId = parseInt(req.params.postId, 10);
        const tagId = parseInt(req.params.tagId, 10);
        const userId = parseInt(req.session.userId, 10);
    
        // Check if the post with the given postId exists and if the authenticated user has the right to edit the post
        const post = await Post.findOne({
          where: {
            id: postId,
            UserId: userId,
          },
        });
    
        if (!post) {
          return res.status(404).json({ message: "Post not found or you are not authorized to edit this post." });
        }
    
        // Check if the tag with the given tagId exists
        const tag = await Tag.findOne({
          where: {
            id: tagId,
          },
        });
    
        if (!tag) {
          return res.status(404).json({ message: "Tag not found." });
        }
    
        // Check if the tag is already associated with the post
        const existingPostTag = await PostTag.findOne({
          where: {
            PostId: postId,
            TagId: tagId,
          },
        });
    
        if (existingPostTag) {
          return res.status(400).json({ message: "Tag is already associated with the post." });
        }
    
        // Add the association between the post and the tag in the post_tag table
        await PostTag.create({
          PostId: postId,
          TagId: tagId,
        });
    
        return res.status(200).json({ message: "Tag added to the post successfully." });
      } catch (error) {
        return res.status(500).json({ message: "An error occurred while adding the tag to the post.", error: error.message });
      }
});

// delete a post, will check if user is the owner of the post
router.delete("/delete/:postId", autheticateUser, async (req, res) => {
    const postId = parseInt(req.params.postId,10);

    try{
        const post = await Post.findOne({
            where: {
                id: postId,
                UserId: parseInt(req.session.userId, 10)
            }
        });

        if (!post){
            return res.status(404).json({message: "Post not found or don't have the access to the action"});
        }

        await post.destroy();

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch(error){
        return res.status(500).json({
            message: "An error occured",
            errorMessage: error.message,
            errorStack: error.stack
        })
    }
})


// get all restaurants' post in the db, notes: user_post won't be in here!!
router.get("/", async (req, res)=>{
    try{
        const posts = await Post.findAll({
            where: {
                RestaurantId: {
                    [Op.ne]: null,
                  },
            },
            include: [
                {
                    model: User,
                    attributes: ["username"]
                }
                ,
                {
                model: Restaurant,
                attributes: ["restaurantName", "profileImage", "id"],
                }],
        });
        return res.status(200).json(posts);
    }catch(error){
        const errorMessage = error.message;
        return res.status(500).json({
            message: "An error occured when fetching for posts",
            error: errorMessage
        });
    }
});


module.exports = router;