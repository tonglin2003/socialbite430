const express = require("express");
const router = express.Router();
const { Restaurant, User, RestaurantFollow } = require("../models");
const { autheticateUser } = require("../middleware/authUser");
require("dotenv").config();
const { Op } = require("sequelize");

// import axios from the axios to fetch for google map api
const axios = require("axios");
const googleApiKey = process.env.GOOGLE_API_KEY;


// Add a follower to a restaurant
router.post("/:restaurantId/follow", autheticateUser, async (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId, 10);
  const userId = parseInt(req.session.userId, 10);

  try {
    // Check if the restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Check if the user is already following the restaurant
    const existingFollow = await RestaurantFollow.findOne({
      where: {
        UserId: userId,
        RestaurantId: restaurantId,
      },
    });

    if (existingFollow) {
      return res.status(400).json({ message: "You are already following this restaurant." });
    }

    // Create the follow
    await RestaurantFollow.create({ UserId: userId, RestaurantId: restaurantId });
    return res.status(201).json({ message: "Restaurant followed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while following the restaurant.", error: error.message });
  }
});

//remove a follower by restaurant id
router.delete("/:restaurantId/unfollow", autheticateUser, async (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId, 10);
  const userId = parseInt(req.session.userId, 10); // Get user ID from the session

  try {
    // Check if the follow relationship exists
    const follow = await RestaurantFollow.findOne({
      where: { UserId: userId, RestaurantId: restaurantId },
    });

    if (!follow) {
      return res.status(404).json({ message: "Follow not found for this restaurant." });
    }

    // Remove the follow relationship
    await follow.destroy();
    return res.status(200).json({ message: "Unfollowed restaurant successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while unfollowing the restaurant.",
      error: error.message,
    });
  }
});


//get number of followers for a restaurant
router.get("/:restaurantId/follows/count", async (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId, 10);

  try {
    // Check if the restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Count the number of followers for the restaurant
    const followCount = await RestaurantFollow.count({
      where: { RestaurantId: restaurantId },
    });

    return res.status(200).json({ restaurantId, followCount });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while counting followers for the restaurant.",
      error: error.message,
    });
  }
}
)


// fetch to google map api for the address's lat and lng by axios
async function fetchRestaurantLatLng(address) {
  
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${(
        address
      )}&key=${googleApiKey}`
    );

    if (response && response.data.results.length > 0) {
      const result = response.data.results[0];
      const latitude = result.geometry.location.lat;
      const longitude = result.geometry.location.lng;
      return { latitude, longitude };
    } else {
      console.log("No results found in API response.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Re-throw the error to propagate it
  }
}

// search like term in the restaurant name
router.get("/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;

    // Search for restaurants where the name is similar to the keyword
    const restaurants = await Restaurant.findAll({
      where: {
        restaurantName: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    });

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while searching for restaurants.",
      errorMessage: error.message,
      errorStack: error.stack,
    });
  }
});

// update the restaurant info, need log in
router.patch(
  "/editRestaurant/:restaurantId",
  autheticateUser,
  async (req, res) => {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    let latLng = null;

    try {
      // fetch for restaurant in the db
      const restaurantExist = await Restaurant.findOne({
        where: {
          UserId: parseInt(req.session.userId, 10),
          id: restaurantId,
        }
      });

      if (!restaurantExist) {
        return res.status(404).json({ message: "Restaurant Not Found" });
      }

      // if restaurant does exist, check if the user need to change address
      // if need to change address, fetch for a new latitude and longitude from google geolocation api
      if (req.body.address !== null) {
        latLng = await fetchRestaurantLatLng(req.body.address);
      }

      // update the restaurant info
      await restaurantExist.update({
        restaurantName: req.body.restaurantName
          ? req.body.restaurantName
          : restaurantExist.restaurantName,
        address: latLng ? req.body.address : restaurantExist.address,
        latitude: latLng ? latLng.latitude : restaurantExist.latitude,
        longitude: latLng ? latLng.longitude : restaurantExist.longitude,
        profileImage: req.body.profileImage ? req.body.profileImage : restaurantExist.profileImage,
        heroImage: req.body.heroImage ? req.body.heroImage : restaurantExist.heroImage,
      });

      return res.status(201).json({ message: "It was updated successfully", restaurant: restaurantExist});
    } catch (error) {
      // Handle Sequelize validation errors
      if (error.name === "SequelizeValidationError") {
        return res.status(500).json({
          message: "An error occurred during creating restaurant",
          errorMessage: "Validation error",
          errorStack: error.stack,
        });
      }

      // Handle any other unexpected errors
      return res.status(500).json({
        message: "An error occurred during creating restaurant",
        errorMessage: error.message,
        errorStack: error.stack,
      });
    }
  }
);

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
router.delete("/:restaurantId", autheticateUser, async (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId, 10);

  try {
    const restaurant = await Restaurant.destroy({
      where: { id: restaurantId },
    });

    if (!restaurant || restaurant.userId != req.session.userId) {
      return res
        .status(404)
        .json({ message: "We can't find your restaurant!" });
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


// post or create a restauarant, require user login
router.post("/", autheticateUser, async (req, res) => {
  try {
      // Find the latitude and longitude of the restaurant based on the address given
      const latLng = await fetchRestaurantLatLng(req.body.address);
  
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
