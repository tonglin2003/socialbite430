const express = require("express");
const router = express.Router();
const { QueryTypes } = require("sequelize");
const {sequelize} = require("../models/index"); // get sequelize from the index.js to gain access to the database
const { autheticateUser } = require("../middleware/authUser");
const {User, Restaurant, UserRate} = require("../models");

// post a review on a restaurant, user is not allowed to post more than 1 review to a restaurant
router.post("/:restaurantId", autheticateUser, async (req,res)=>{
    //get restaurant id in integer
    const restauarantId = parseInt(req.params.restaurantId, 10);

    // create a new post with model
    try{
        // find if the user comment on the restaurant already
        // user is only allowed to post one review for each restaurant
        const reviewExist = await UserRate.findAll({
            where:{
                UserId: parseInt(req.session.userId, 10),
                RestaurantId: restauarantId,
            }
        });

        if (reviewExist.length === 0){
            const newReview = await UserRate.create({
                UserId: parseInt(req.session.userId, 10),
                RestaurantId: restauarantId,
                rate: parseFloat(req.body.rate),
                review: req.body.review ? req.body.review : null
            });
    
            return res.status(201).json({
                message: "The review is uploaded successfully",
                rate: newReview.rate
            });
        }
        else{
            return res.status(409).json({
                message: "You have commented on this restaurant already"
            });
        }

    }catch(error){
        return res.status(500).json({
            message: "An error occured while creating a review",
            errorMessage: error.message
        });
    }
});

// fetch all reviews for a restaurant
router.get("/:restaurantId", async (req, res)=>{
    const restauarantId = parseInt(req.params.restaurantId, 10);
    try{
        const allReviews = await UserRate.findAll({
            where:{
                RestaurantId: restauarantId
            },
            include: {
              model: User,
              attributes: ["username", "email", "hasRestaurant"],
            },
        });

        return res.status(200).json(allReviews);
    }catch(error){
        return res.status(500).json({
            message: "An error occured while creating a review",
            errorMessage: error.message
        });
    }
});

// update the review, will check if this comment belongs to the current_user
router.patch("/:reviewId", autheticateUser, async (req, res) => {
    const reviewId = parseInt(req.params.reviewId, 10);
    const userId = parseInt(req.session.userId, 10);
  
    try {
      // Check if the review exists and belongs to the logged-in user
      const existingReview = await UserRate.findOne({
        where: {
          id: reviewId,
          UserId: userId // Add this condition to ensure the review belongs to the logged-in user
        }
      });
  
      if (!existingReview) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      // Update the review
      await existingReview.update({
        rate: req.body.rate? parseFloat(req.body.rate): parseFloat(existingReview.rate),
        review: req.body.review ? req.body.review : existingReview.review
      });
  
      return res.status(200).json({
        message: "Review updated successfully",
        rate: existingReview.rate,
        review: existingReview.review
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while updating the review",
        errorMessage: error.message
      });
    }
  });

  // delete a review from the db, will check if the current_user is the review's owner
  router.delete("/:reviewId", autheticateUser, async (req, res) => {
    const reviewId = parseInt(req.params.reviewId, 10);
    const userId = parseInt(req.session.userId, 10);
  
    try {
      // Check if the review exists and belongs to the logged-in user
      const existingReview = await UserRate.findOne({
        where: {
          id: reviewId,
          UserId: userId // Add this condition to ensure the review belongs to the logged-in user
        }
      });
  
      if (!existingReview) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      // Delete the review
      await existingReview.destroy();
  
      return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while deleting the review",
        errorMessage: error.message
      });
    }
  });
  
  
router.get("/user/:userId", async (req, res)=>{
  const userId = parseInt(req.params.userId, 10);
  try {
      const reviews = await UserRate.findAll({
          where: {
              UserId: userId
          }
      });

      if (reviews.length === 0){
          return res.status(404).json({message: "No reviews found"});
      }
      else{
          return res.status(201).json(reviews);
      }

  } catch(error) {
      const errorMessage = error.message;
      return res.status(500).json({message: "An error occured when fetching for reviews", error: errorMessage})
  }
});

module.exports = router;