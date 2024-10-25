const express = require("express");
const router = express.Router();
const { Restaurant, User } = require("../models");
const { autheticateUser } = require("../middleware/authUser");
require("dotenv").config();
const { Op } = require("sequelize");


// get restaurant by their by id
router.get("/:restaurantId", async (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId, 10);

  try {
    const restaurant = await Restaurant.findOne({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "There are no restaurant found!" });
    }
    return res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occured during fetching restaurant",
    });
  }
});

// delete destaurant from the database
router.delete("/:restaurantId", async (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId, 10);

  try {
    const restaurant = await Restaurant.destroy({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "There are no restaurant found!" });
    }
    return res
      .status(200)
      .json({ message: "The restaurant is deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occured during fetching restaurant",
    });
  }
});


// post a restauarant, require user login
router.post("/", autheticateUser, async (req, res) => {
    try {
        // Find the latitude and longitude of the restaurant based on the address given
        console.log("fetching.......")
        const latLng = await fetchRestaurantLatLng(req.body.address);
        console.log("Finishing fetching")
    
        // Check if latLng is fetched successfully
        if (!latLng) {
          return res.status(400).json({
            message: "Invalid address. Please enter a valid address.",
          });
        }

        // update the hasRestaurant section in the user table to true, to state they have a restaurant
        await User.update(
            { hasRestaurant: true }, // Data to update
            { where: { id: req.session.userId } } // Condition for the update
          );
          
        // Create the restaurant
        const restaurant = await Restaurant.create({
          UserId: req.session.userId,
          restaurantName: req.body.restaurantName,
          address: req.body.address,
          latitude: latLng.latitude,
          longitude: latLng.longitude,
          profileImage: req.body.profileImage,
          heroImage: req.body.heroImage,
        });
    
        return res.status(201).json({
          message: "The restaurant is created successfully",
          restaurant: {
            restaurant: restaurant.restaurantName,
          },
        });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occured during creating restaurant", // the error include wrong address that can't be fetched by google map api
      errorMessage: error.message,
      errorStack: error.stack,
    });
  }
});

// get all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();

    if (restaurants.length === 0) {
      return res.status(404).json({ message: "There are no restaurants!" });
    }

    return res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occured during fetching restaurants",
    });
  }
});

module.exports = router;
