const express = require("express");
const router = express.Router();
const { Restaurant, Post, User} = require("../models");
const { Op,QueryTypes } = require("sequelize");


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