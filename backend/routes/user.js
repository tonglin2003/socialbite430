const express = require("express");
const router = express.Router();
const { QueryTypes } = require("sequelize");
const {sequelize} = require("../models/index"); // get sequelize from the index.js to gain access to the database
const { userAllowPosition } = require("../middleware/userAllowPosition");
const { autheticateUser } = require("../middleware/authUser");
const {User, Restaurant, UserRate} = require("../models");



// post user's location on the session for future use
router.post("/location", async (req,res)=>{
    try{
        const userLocation = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
    
        req.session.userLocation = userLocation;
        return res.status(201).json({
            message: "The location is being stored successfully",
            userLocation: userLocation
        });

    } catch(error) {
        console.error(err);
        return res.status(500).send({message: err.message});
    }
});

// get user's location from the session, could be used to check if user shared their location
router.get("/location", async (req,res)=>{
    if (req.session.userLocation) {
        return res.status(200).json({
            userLocation: {
                latitude: req.session.userLocation.latitude,
                longitude: req.session.userLocation.longitude
            }
        });
    }
    else{
        return res.status(401).json({user: null});
    }
});

// get all restaurant of the current user
router.get("/my_restaurant", autheticateUser, async (req, res)=>{
    try{
        const my_restaurants = await Restaurant.findAll({
            where: {
                UserId: parseInt(req.session.userId)
            }
        });

        if (my_restaurants.length === 0){
            return res.status(404).json({message: "No restaurant found"});
        }
        else{
            return res.status(201).json(my_restaurants);
        }

    }catch(error){
        const errorMessage = error.message;
        return res.status(500).json({message: "An error occured when fetching for restaurants", error: errorMessage})
    }
});

//get the user information by their user_id
router.get("/get_user/:userId", autheticateUser, async(req, res)=>{
    console.log("Attempting to fetch user:", req.params.userId);
    const userId = parseInt(req.params.userId,10);
    

    try{
        const user = await User.findOne({where: {id: userId}});
        return res.status(200).json({
            username: user.username,
            email: user.email,
            UserId: user.id,
            hasRestaurant: user.hasRestaurant,
            profileImage: user.profileImage
        });

    }catch(error){
        return res.status(500).json({
            message: "An error occurred when fetching for user",
            errorMessage: error.message,
            errorStack: error.stack
        })
    }
})


// get all current_user's review
router.get("/my_reviews", autheticateUser, async (req, res)=>{
    try{
        const reviews = await UserRate.findAll({
            where: {
                UserId: parseInt(req.session.userId)
            }
        });

        if (reviews.length === 0){
            return res.status(404).json({message: "No reviews found"});
        }
        else{
            return res.status(201).json(reviews);
        }

    }catch(error){
        const errorMessage = error.message;
        return res.status(500).json({message: "An error occured when fetching for reviews", error: errorMessage})
    }
});

// update an user's info
router.patch("/editUser", autheticateUser, async (req, res)=> {
try {
    // Fetch the current user from the database
    const user = await User.findByPk(req.session.userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update the user's information
    await user.update({
        username: req.body.username ? req.body.username : user.username,
        email: req.body.email ? req.body.email : user.email,
        profileImage: req.body.profileImage ? req.body.profileImage : user.profileImage,
        hasRestaurant: req.body.hasRestaurant ? req.body.hasRestaurant : user.hasRestaurant
    });

    return res.status(200).json({ message: "User information updated successfully" });
    } catch (error) {
    // Handle any errors
    return res.status(500).json({
        message: "An error occurred while updating user information",
        errorMessage: error.message,
        errorStack: error.stack,
    });
    }
});

// delete current user's account
router.delete("/delete_user_account", autheticateUser, async (req, res)=>{
    try{
        const deletedAccount = await User.destroy({
            where: { id: parseInt(req.session.userId, 10) }
        });
        return res.status(200).json({message: "Account deleted successfully"});
    } catch(error){
        return res.status(500).json({message: "An error occured while deleting the account", error: error.message});
    }
});


// get nearby restaurant based on the radius kilometers, require users to share their location
router.get("/nearby_restaurant/:radiusKm", userAllowPosition, async (req, res) => {
    const radiusMeters = parseFloat(req.params.radiusKm) * 1000;
    const userLatitude = parseFloat(req.session.userLocation.latitude);
    const userLongitude = parseFloat(req.session.userLocation.longitude);

    try{
        // use sequelize.query to select from the database using extension of earth_distance
        const nearbyRestaurants = await sequelize.query(
            `
            SELECT * FROM "restaurant"
            WHERE earth_box(ll_to_earth(?, ?), ?) @> ll_to_earth("latitude", "longitude")
            `,
            {
                replacements: [userLatitude, userLongitude, radiusMeters], // replacement for the question marks
                type: QueryTypes.SELECT
            },
        );

        if (nearbyRestaurants.length > 0) {
          return res.json(nearbyRestaurants);
        } else {
          return res.status(404).json({ message: "No restaurant found" });
        }
    } catch(error){
        const errorMessage = error.message;
        return res.status(500).json({message: "An error occured when fetching for restaurants", error: errorMessage});
    }
});

module.exports = router;